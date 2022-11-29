// import moment from 'moment.js';
import moment from "moment/moment";

//MANIPULANDO DATAS COM MOMENT

//para adicionar horas, min, dias, meses, etc

//criando uma instancia do tempo atual

export const testMoment = () => {

    const m = moment();

    console.log('original moment: ', m.toString());

    //adicionando minutos
    m.add(10, 'm');

    //adicionando horas
    //h ou hours
    // m.add(5, 'h');

    //adicionando mais de uma intancia de momento
    // m.add(5, 'h').add(20, 'minutes');

    // m.add({
    //     'hours': 5,
    //     'minutes': 3
    // });

    console.log('after manipulation: ', m.toString());

    //funciona da mesma maneira para subtrair, basta substituir add por subtract

    //pode obter o começo de determinada hora, dia, mes, ano etc

    //retorna o começo da hora 
    console.log('after manipulation: ', m.startOf('h').toString());
    console.log('after manipulation: ', m.endOf('day').toString());
}



// const registerDate = moment();

export const dateChageReview = (currentDate, isReviwed, count) => {
    const counter = count;

    // for (i = 0; i < 6; 1++) {
    //     if (isReviwed) {
    //         counter = counter + 1
    //         i++
    //         isReviwed = false
    //     }
    // }

    if (isReviwed) {
        counter = counter + 1
        isReviwed = false
    }

    const newDate = '';
    const restartLoop = false;

    // if(restartLoop === true ){

    // }

    switch (counter) {
        case counter === 1:
            newDate = currentDate.add(5, 'h');
            break;
        case counter === 2:
            newDate = currentDate.add(2, 'd');
            break;
        case counter === 3:
            newDate = currentDate.add(5, 'd');
            break;
        case counter === 4:
            newDate = currentDate.add(7, 'd');
            break;
        case counter === 5:
            newDate = currentDate.add(10, 'd');
            break;
        case counter === 6:
            restartLoop = true
            break;

        default:
            break;
    }

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
