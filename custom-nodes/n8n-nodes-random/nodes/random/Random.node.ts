
import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeApiError,
    IHttpRequestOptions, 
} from 'n8n-workflow';


export class Random implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Random',
		name: 'random',
		icon: 'file:icon.svg',
		group: ['transform'],
		version: 1,
		subtitle: '=True Random Number Generator',
		description: 'Gera um número inteiro aleatório usando a API do Random.org',
		defaults: {
			name: 'Random Number',
		},
		inputs: ['main'],
		outputs: ['main'],
		properties: [
			{
				displayName: 'Min',
				name: 'minValue',
				type: 'number',
				default: 1,
				required: true,
				description: 'O menor valor inteiro a ser retornado (inclusivo)',
			},
			{
				displayName: 'Max',
				name: 'maxValue',
				type: 'number',
				default: 100,
				required: true,
				description: 'O maior valor inteiro a ser retornado (inclusivo)',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			try {
				const min = this.getNodeParameter('minValue', i, 0) as number;
				const max = this.getNodeParameter('maxValue', i, 0) as number;

				if (min > max) {
					throw new NodeApiError(this.getNode(), { message: 'O valor de "Min" não pode ser maior que o valor de "Max".' });
				}

                
				const options: IHttpRequestOptions = {
					method: 'GET',
					
					url: `https://www.random.org/integers/?num=1&min=${min}&max=${max}&col=1&base=10&format=plain&rnd=new`,
					json: false,
				};

				const response = await this.helpers.httpRequest(options) as string;
				const randomNumber = parseInt(response.trim(), 10);

				returnData.push({
					json: {
						...items[i].json,
						randomNumber: randomNumber,
					},
				});
			} catch (error: any) {
				if (this.continueOnFail()) {
					items.push({ json: this.getInputData(i)[0].json, error, pairedItem: i });
				} else {
					throw new NodeApiError(this.getNode(), error, { itemIndex: i });
				}
			}
		}

		return [returnData];
	}
}