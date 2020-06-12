import ProductModel from '../models/products'

class freteService {
    public async urlFrete(product:number,quantity:number,cep:string):Promise<string|false>{
        const Product = await ProductModel.infoFreteProduct(product)
    
        const peso:number = Product[0].weight*quantity
        const comprimento:number = Product[0].lenght*quantity
        const altura:number = Product[0].height*quantity
        const largura:number = Product[0].width*quantity
        const diametro:number = Product[0].diameter*quantity
        const valor:number = Product[0].price*quantity
        const total:number = largura+altura+comprimento

        if(25<=total || total<=200 && peso<30){
            let base = 'http://ws.correios.com.br/calculador/CalcPrecoPrazo.aspx'
            let nCdEmpresa = '?nCdEmpresa='
            let nDsSenha = '&sDsSenha='
            let nCdServico = '&nCdServico=04510'
            let sCepOrigem = '&sCepOrigem='+process.env.CEP
            let sCepDestino = '&sCepDestino='+cep
            let nVlPeso = '&nVlPeso='+peso
            let nCdFormato = '&nCdFormato=1'
            let nVlComprimento = '&nVlComprimento='+comprimento
            let nVlAltura = '&nVlAltura='+altura
            let nVlLargura = '&nVlLargura='+largura
            let nVlDiametro = '&nVlDiametro='+diametro
            let sCdMaoPropria = '&sCdMaoPropria=n'
            let nVlValorDeclarado = '&nVlValorDeclarado='+valor
            let sCdAvisoRecebimento = '&sCdAvisoRecebido=n'
            let StrRetorno = '&StrRetorno=xml'

            const url = base.concat(nCdEmpresa,nDsSenha,nCdServico,sCepOrigem,sCepDestino,nVlPeso,nCdFormato,nVlComprimento,nVlAltura,nVlLargura,nVlDiametro,sCdMaoPropria,nVlValorDeclarado,sCdAvisoRecebimento,StrRetorno)

            return url
        }else{
            return false
        }
    }
}
export default new freteService()