const prompt = require('prompt-sync')();
require('dotenv').config();
var AssistantV1 = require('watson-developer-cloud/assistant/v1');

var assistant = new AssistantV1({
  version: process.env.VERSION,
  //iam_apikey: 'a389d2a0-8f5b-49f8-b5ba-f1ffd3564b53',
  iam_apikey: process.env.IAM_APIKEY,
  //iam_apikey: '3adCjxXlqA2drt3LKwcg2s2RUfCwOrHiSSdclLNWjq9x',
  url: process.env.URL,
});

const workspace_id = '6777699a-7420-438c-ae73-7e13d5929864';

assistant.message({workspace_id}, trataresposta);


let fimConversa = false;


function trataresposta(err, resposta)
{
    if(err)
    {
        console.log(err);
        return;
    }

    //detecta a intenção da conversa
    if(resposta.intents.length > 0)
    {
        console.log('Detectei a intenção: ' + resposta.intents[0].intent);

        if(resposta.intents[0].intent == 'despedida')
        {
            fimConversa = true;
        }
    }

    //exibe resposta
    if(resposta.output.text.length > 0)
    {
        console.log(resposta.output.text[0]);
    }

    if(!fimConversa)
    {
        const mensagemUsuario = prompt('>>');
        assistant.message({
        workspace_id,
        input: {text: mensagemUsuario},
        context: resposta.context
        }, trataresposta);
    }    
}