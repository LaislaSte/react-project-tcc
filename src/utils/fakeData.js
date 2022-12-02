// import moment from 'moment.js';
import moment from "moment/moment";

//MANIPULANDO DATAS COM MOMENT

//para adicionar horas, min, dias, meses, etc

//criando uma instancia do tempo atual

export const testMoment = () => {

    const fakeDateAdded = moment();

    console.log('original moment: ', fakeDateAdded.toString());

    //adicionando minutos
    const newDate = fakeDateAdded.add(5, 'd');

    //adicionando horas
    //h ou hours
    // m.add(5, 'h');

    //adicionando mais de uma intancia de momento
    // m.add(5, 'h').add(20, 'minutes');

    // m.add({
    //     'hours': 5,
    //     'minutes': 3
    // });

    // console.log('after manipulation: ', m.toString());

    //funciona da mesma maneira para subtrair, basta substituir add por subtract

    //pode obter o começo de determinada hora, dia, mes, ano etc

    //retorna o começo da hora 
    // console.log('after manipulation: ', m.startOf('h').toString());
    // console.log('after manipulation: ', m.endOf('day').toString());
    const obj = { currentDate: fakeDateAdded, newDate: newDate }

    return obj
}


/*
ira ter algumas etapas


a primeiro momento será quando a revisão chega a primeira vez no feed

neste caso ele é registrado no banco primeiramente com um
vai cadastrar uma data que conta 5 horas a partir do momento instanciado

const a = moment().add(5, 'h');
a.format('YYYY-M-D');
a.toString() //se necessario

{currentDate: a,
post que não foi memorizado
count: 0
}

ao clicar para revisar, só aparecerá no feed do reviews daqui a 5 horas, porque sera usado o isSame do moment para comparar a data futura registrada neste post com a data atual

a query seria 

const currentDate = moment().format('YYYY-M-D');
pegue todas as revisoes que o campo futureDate === dataAtual

ai no caso é só apenas renderizar na rota as reviews que vier

se os docs.lenght for > 10 bolinha de aviso active


ao clicar no btn já revisei

a revisao é atualizada para uma nova data de revisao, um novo contador

const a = moment().add(5, 'h');
a.format('YYYY-M-D');
a.toString() //se necessario

(newDate, counter, reviewId) => {
update(), {currentDate: newDate,
count: counter
}

}


ao enviar dados do firebase para a função que recebe a date como string, transforma em timestamp, altera, e retorna
*/


// const registerDate = moment();

export const dateChangeReview = (currentCounter, stillReviwing) => {
    let counter = currentCounter;
    // como no banco é cadastrado como string da pra fazer uma chamada da data dessa maneira 
    // moment("20-10-2010 4:30", "DD-MM-YYYY HH:mm", true); //OU: moment('24/12/2019 09:15', "DD MM YYYY hh:mm", true);

    // let newDate = moment(currentDate, "DD-MM-YYYY HH:mm", true);
    let newDate = moment();
    console.log('antes da alteração do swithch:  Data atual: ', newDate.format("DD-MM-YYYY HH:mm"), 'contador atual: ', counter);

    //     You can use strict mode, which will identify the parsing error and set the Moment object as invalid:

    // moment('24/12/2019 09:15:00', "DD MM YYYY hh:mm:ss", true);

    // pode usar esse tipo de parse para o moment() para pegar o horario
    // 2013-02-08 09:30  

    //     As of version 2.3.0, you may specify a boolean for the last argument to make Moment use strict parsing. Strict parsing requires that the format and input match exactly, including delimeters.

    // moment('It is 2012-05-25', 'YYYY-MM-DD').isValid();       // true
    // moment('It is 2012-05-25', 'YYYY-MM-DD', true).isValid(); // false
    // moment('2012-05-25',       'YYYY-MM-DD', true).isValid(); // true
    // moment('2012.05.25',       'YYYY-MM-DD', true).isValid(); // false
    // You can use both locale and strictness.

    // moment('2012-10-14', 'YYYY-MM-DD', 'fr', true);

    //o moment pode pegar uma data q passar, basta apenas especificar qual seu formato, use o boolean para strict-mode
    // moment("20-10-2010 4:30",       "DD-MM-YYYY HH:mm", true); //OU:
    // moment('24/12/2019 09:15', "DD MM YYYY hh:mm", true);

    if (stillReviwing) {
        counter = counter + 1;

        switch (counter) {
            case 1:
                newDate = newDate.add(1, 'd');
                break;
            case 2:
                newDate = newDate.add(2, 'd');
                break;
            case 3:
                newDate = newDate.add(3, 'd');
                break;
            case 4:
                newDate = newDate.add(5, 'd');
                break;
            case 5:
                newDate = newDate.add(7, 'd');
                break;
            case 6:
                newDate = newDate.add(14, 'd');
                break;

            default:
                if (counter > 6) {
                    counter = counter
                    newDate = newDate.add(15, 'day');
                }
        }
    }

    newDate = newDate.format('DD-MM-YYYY HH:mm').toString();
    console.log('depois da alteração:  Data alterada: ', newDate, 'contador alterado: ', counter);
    const result = {
        date: newDate,
        count: counter
    }

    return result;
}

//ao clicar em já revisei

// const alreadyReviewed = () => {
//     const isReviwed = true;

//     // pegar a data atual no banco e colocar em current date
//     const currentDate = moment();
//     const result = dateChageReview(currentDate, isReviwed, counter);
//     const newDate = result.date;
//     const newCounter = result.count;

//     //atualiza o documento com os novos valores dos parametros data de review e contador
//     // updateReview(newDate, newCounter);

//     isReviwed = false;
//     alert('revisão atualizada');
//     // Navigate('/review');

// }
