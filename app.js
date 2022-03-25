const rua = document.querySelector('#rua')
const bairro = document.querySelector('#bairro')
const cidade = document.querySelector('#cidade') 
const estado = document.querySelector('#estado')
const ibge = document.querySelector('#ibge')

/* Função para limpar os campos do formulário */

function cleanForm(){
    rua.value('')
    bairro.value('')
    cidade.value('')
    estado.value('')
    ibge.value('')
}

function myCallBack(){
    /* Se não houver erro no fetch... */
    if(!("erro") in conteudo){
        rua.value=(conteudo.logradouro)
        bairro.value=(conteudo.bairro)
        cidade.value=(conteudo.localidade)
        estado.value=(conteudo.uf)
        ibge.value=(conteudo.ibge)
    } else{
        /* CEP não encontrado */
        cleanForm()
        alert("CEP não encontrado")
    }
}

function searchCep(valor){
    /* Variável cep somente com dígitos */
    var cep = valor.replace(/\D/g, '')

    /* Verifica se o campo cep possui valor informado */
    if(cep != ""){
        var validacep = /^[0-9]{8}$/

        if(validacep.test(cep)){

            /* Preenche todos os campos com "..." enquanto consulta webservice */
            rua.value('...')
            bairro.value('...')
            cidade.value('...')
            estado.value('...')
            ibge.value('...')


            /* Cria um elemento javascript */
            var script = document.createElement('script')

            /* Sincroniza com o callback */
            script.src = 'https://viacep.com.br/ws/'+ cep + '/json/?callback=myCallBack'

            /* Insere script no documento e carrega o conteúdo */
            document.body.appendChild(script)
        } else{
            /* CEP inválido */
            cleanForm()
            alert("Formato de CEP inválido")
        }
    } else{
        /* cep sem valor limpa formulário */
        cleanForm()
    }
}
