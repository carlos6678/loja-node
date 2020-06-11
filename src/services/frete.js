const ProductModel = require('../models/products')

module.exports = {
    urlFrete:async function(product,quantity,cep){
        const Product = await ProductModel.infoFreteProduct(product)
    
        const peso = Product[0].weight*quantity
        const comprimento = Product[0].lenght*quantity
        const altura = Product[0].height*quantity
        const largura = Product[0].width*quantity
        const diametro = Product[0].diameter*quantity
        const valor = Product[0].price*quantity

        if(25<=(largura+altura+comprimento)<=200 && peso<30){
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