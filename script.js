document.querySelector(".main_form").addEventListener("submit", (e) => {
    e.preventDefault();

    const firstName = e.target.querySelector('input[name="firstName"]').value.trim();
    const lastName = e.target.querySelector('input[name="lastName"]').value.trim();
    const country = e.target.querySelector('input[name="country"]').value.trim();
    const score = parseInt(e.target.querySelector('input[name="score"]').value.trim());

    const errorPrompter = document.querySelector(".main_error-prompter");

    errorPrompter.style.display = "none";

    if (!firstName || !lastName || !country || !score || isNaN(score)) {
        errorPrompter.style.display = "block";
        return;
    }

    const scoreboardBody = document.querySelector(".main_scoreboard tbody");

    const newRow = `
        <tr>
            <td>${firstName} ${lastName}</td>
            <td>${country}</td>
            <td>${score}</td>
            <td class="main_scoreboard-btn-container">
                <button>&#x1f5d1;</button>
                <button class="increase-btn"> +5 </button>
                <button class="decrease-btn"> -5 </button>
            </td>
        </tr>
    `;

    scoreboardBody.insertAdjacentHTML('beforeend', newRow);
    sortScoreBoard();
    activateBtnEventListener();

    e.target.reset();
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
});

function activateBtnEventListener() {
    document.querySelectorAll(".main_scoreboard-btn-container button").forEach((button) => {
        button.addEventListener("click", (e) => {
            const target = e.target;
            const scoreElement = target.parentElement.previousElementSibling;
            let scoreChange = target.classList.contains('increase-btn') ? 5 : -5;
            if (target.textContent === '🗑') {
                target.closest('tr').remove();
            } else {
                scoreElement.textContent = parseInt(scoreElement.textContent) + scoreChange;
            }
            sortScoreBoard();
        });
    });
}

function sortScoreBoard() {
    const scoreboardBody = document.querySelector(".main_scoreboard tbody");
    const rows = Array.from(scoreboardBody.querySelectorAll('tr'));
    rows.sort((a, b) => {
        const scoreA = parseInt(a.children[2].textContent);
        const scoreB = parseInt(b.children[2].textContent);
        return scoreB - scoreA;
    });
    rows.forEach(row => scoreboardBody.appendChild(row));
}

activateBtnEventListener();