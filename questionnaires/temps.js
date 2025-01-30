let timer;
function startTimer(){
    let timeLeft=180;
    const timeDisplay= document.getElementById('timer');
    const form = document.getElementById('qcm-section');

    timer=setInterval(() =>{
        if(timeLeft<=0){
            clearInterval(timer);
            alert("Temps écoulé pour cette interrogation!");
            timeDisplay.textContent= `Temps restant: 00 `;
            form.classList.add('disabled'); //Bloquer les réponses
            correction(true); //Corriger automatiquement

            
        }else{
             // Calculer les minutes et secondes
             const minutes = Math.floor(timeLeft / 60);
             const seconds = timeLeft % 60;
             timeDisplay.textContent = `Temps restant: ${minutes}mn:${seconds < 10 ? '0' : ''}${seconds}s`;
            // timeDisplay.textContent= `Temps restant: ${timeLeft} secondes`;
        }
        timeLeft--;
    },1000);
}
function stopTimer(){
    clearInterval(timer);
}

function termine() {
    // Arrêter le timer et corriger immédiatement
    stopTimer();
    const form = document.getElementById('qcm-section');
    form.classList.add('disabled'); // Bloquer les réponses
    correction(); // Corriger immédiatement
}

function correction(isTimeUp=false){
    // clearInterval(timer);

    const bonnereponse={
        rps1:["A", "C"],
        rps2:"B",
        rps3: "D",
        rps4:["B", "D"],
        rps5:["A", "C"],
        rps6:["C", "D"],
        rps7:"C"
        
    };
    let note = 0;
    let total = 50






// Vérification des réponses pour chaque question
Object.keys(bonnereponse).forEach(questionId =>{
    const bonnes= bonnereponse[questionId]; //Les bonnes réponses pour cette question
    const options=document.getElementsByName(questionId); //Options disponible pour cette question
    let allCorrect = true; //Indique si toutes les bonnes réponses sont cochées
    let hasWrong = false; //Indique si une mauvaise réponse est cochée

    options.forEach(option => {

        // Supprimer les anciens feedbacks pour éviter les doubloons
        const existingFeedback = option.parentElement.querySelector('.feedback');
        if(existingFeedback){
            existingFeedback.remove();
        }
        const feedbackSpan = document.createElement('span');
        feedbackSpan.classList.add('feedback');

        //Vérifier si l'option est une bonne réponse
        if(bonnes.includes(option.value)){
            feedbackSpan.textContent="✔";
            feedbackSpan.classList.add('correct-icon');
            option.parentElement.appendChild(feedbackSpan);

            // Si la réponse est correcte mais non cochée
            if(!option.checked){
                allCorrect = false;
            }
        }else{
            // Option incorrecte
            feedbackSpan.textContent="❌";
            feedbackSpan.classList.add('incorrect-icon');
            option.parentElement.appendChild(feedbackSpan);
        
        // Si une réponse incorrecte est cochée
            if(option.checked){
            hasWrong = true;
        }
        }
    
    });


    //La question est correcte seulement si toutes les bonnes réponses sont cochées et aucune mauvaise réponse
    const result = allCorrect && !hasWrong ? 1 : 0;
    if(result===1){
        note++;
    }
    
    // Afficher le résultat (1 ou 0) dans la case associé à la question
    const resultBox = document.getElementById(`${questionId}-result`);
    if(resultBox){
        resultBox.textContent = result;
    }
    
});

// Affichage de la note
document.getElementById('note').textContent=`Votre note : ${note}/${total}`;

// Si le temps est écoulé, désactiver toutes les options
if(isTimeUp){
    const allQuestions= document.querySelectorAll('input[type="checkbox"]');
    allQuestions.forEach(option=>{
            option.disabled = true;
        });
    }

}
// Lancer le timer automatiquement au chargement de la page
window.onload = startTimer;