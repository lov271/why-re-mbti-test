const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwCoTyLm6AS1TZhwEL4WJUV3ioXG0jCB5VrP0UsSgN4vkTWdCRMYQo5qgxncEkztgdu/exec';

const cardWrapper = document.getElementById('card-wrapper');
const resultContainer = document.getElementById('result-container');
const startPage = document.getElementById('start-page');
const qnaPage = document.getElementById('qna-page');
const resultPage = document.getElementById('result-page');
const questionTitle = document.getElementById('question-title');
const answerBtns = document.querySelectorAll('.answer-btn');
const progressBar = document.querySelector('.progress-bar');
const backBtn = document.getElementById('back-btn');
const qCounter = document.getElementById('q-counter');

const questions = [
    { q: '회사 PC에 새로운 앱을 설치할 때 나는?', a: [{ text: '권한 확인하고 문제 없는 것 같으면<br>설치해버린다.', type: 'A' }, { text: '회사에서 허락 안 한 건 설치 안 하고,<br>다른 허용된 프로그램을 찾아본다.', type: 'S' }] },
    { q: '여행지에서 데이터 로밍이<br>안 될 때 나는?', a: [{ text: '일단 근처의 무료 와이파이를<br>찾아 활용한다.', type: 'A' }, { text: '여행 일정을 잠시 멈추더라도,<br>안전한 유심(USIM)을 구매한다.', type: 'S' }] },
    { q: '동료들이 보안 업데이트 공지를<br>바로 실행하지 않을 때 나는?', a: [{ text: '"왜 안 하지?" 원칙이 지켜지지 않는 것에<br>답답함을 느낀다.', type: 'S' }, { text: '"바쁘면 그럴 수도 있지."<br>일단 이해하고, 나중에 다시 알려준다.', type: 'A' }] },
    { q: '중요 시스템에 긴급 패치가 발표됐지만,<br>안정성 이슈가 우려될 때?', a: [{ text: '보안 위협 제거가 우선!<br>일단 패치를 즉시 적용한다.', type: 'S' }, { text: '안정성이 우선!<br>다른 보완책을 강구하며 검증을 기다린다.', type: 'A' }] },
    { q: '임원이 미승인 클라우드 서비스를<br>쓰자고 할 때?', a: [{ text: '"규정상 불가합니다."<br>정식 절차 완료까지 사용을 보류시킨다.', type: 'S' }, { text: '"일단 제가 검토해 보겠습니다."<br>보안 수준을 검토 후 제한적으로 허용한다.', type: 'A' }] },
    { q: '회사에서 인터넷이 안 될 때 나는?', a: [{ text: '사람들이 모두 나를 찾는다.<br>(문제 해결사)', type: 'T' }, { text: '다른 동료들에게도 상황을 물어보며,<br>문제의 범위를 먼저 파악한다.', type: 'P' }] },
    { q: '웹사이트 비밀번호를<br>교체할 시점에 나는?', a: [{ text: '비밀번호 관리 도구를 사용해<br>새롭고 복잡한 비밀번호를 만든다.', type: 'T' }, { text: '나만의 강력한 암호(Passphrase)<br>생성 규칙으로 직접 만든다.', type: 'P' }] },
    { q: '사용자들이 자꾸 PC 암호를<br>잃어버릴 때 해결책은?', a: [{ text: '2단계 인증(MFA)을 도입해서,<br>암호가 뚫려도 계정을 지키게 한다.', type: 'T' }, { text: '암호 관리 교육을 진행해서,<br>스스로 잘 관리하게 만든다.', type: 'P' }] },
    { q: '보안 사고 예방을 위해, 당신이 더 중요하게 생각하는 것은?', a: [{ text: 'DLP, EDR, SWG 등 빈틈없는<br>기술적 보호조치 구현이 우선.', type: 'T' }, { text: '보안 인식 교육 및 정보보호컨설팅을 통한<br>임직원 보안역량 강화.', type: 'P' }] },
    { q: '신규 서비스를 개발할 때,<br>보안팀의 이상적인 역할은?', a: [{ text: '개발 완료 후, 출시 전에<br>취약점 진단과 모의 해킹으로<br>기술적 완성도를 높인다.', type: 'T' }, { text: '개발 초기 기획 단계부터 참여하여,<br>설계상 보안 위협이 없도록<br>프로세스를 개선한다.', type: 'P' }] }
];

const results = {
    ST: { type: "보안 설계자", sub: "The Architect", mascot: "bee.jpg", tags: ["#소통중심", "#어드바이저", "#유연함", "#리스크관리"], desc: "보안은 잘 짜인 시스템과 자동화된 기술로 완성된다고 믿습니다. 명확한 정책을 수립하고, 강력한 기술적 통제로 사람이 개입할 여지를 최소화하여 잠재적 위협을 원천 차단하는 것을 가장 중요하게 생각합니다.", best_code: "SP", worst_code: "AP" },
    SP: { type: "규정 수호자", sub: "The Guardian", mascot: "guardian.jpg", tags: ["#소통중심", "#어드바이저", "#유연함", "#리스크관리"], desc: "잘 만든 정책과 규정, 그리고 그것을 따르는 사람들의 노력이 합쳐질 때 가장 안전하다고 믿습니다. 기술은 보조적인 수단이며, 결국 보안은 사람이 만들어나가는 문화이자 프로세스라고 생각합니다. 당신의 꼼꼼함이 모두를 구원합니다.", best_code: "ST", worst_code: "AT" },
    AT: { type: "기술 해결사", sub: "The Specialist", mascot: "specialist.jpg", tags: ["#소통중심", "#어드바이저", "#유연함", "#리스크관리"], desc: "규정이나 정책보다 현장에서의 기술적인 판단과 대응 능력이 더 중요하다고 믿습니다. 어떤 위협이든 깊이 있는 기술 전문성으로 분석하고 해결할 수 있다는 자신감을 가지고 있으며, 실제 상황에서의 빠른 조치를 선호합니다.", best_code: "AP", worst_code: "SP" },
    AP: { type: "보안 어드바이저", sub: "The Advisor", mascot: "advisor.jpg", tags: ["#소통중심", "#어드바이저", "#유연함", "#리스크관리"], desc: "보안은 무조건 막는 것이 아니라, 비즈니스와 사람을 이해하며 위험을 '관리'하는 과정이라고 생각합니다. 동료들과의 소통을 통해 현실적인 대안을 찾고, 모두가 만족할 수 있는 접점을 만들어내는 역할에 가장 큰 가치를 둡니다.", best_code: "AT", worst_code: "ST" }
};

let currentQuestionIndex = 0;
let userAnswers = new Array(questions.length).fill(null);
let currentResultType = '';

window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const resultType = urlParams.get('result');
    if (resultType && results[resultType]) {
        showResult(resultType);
    }
};

function startTest() {
    startPage.classList.add('hide');
    qnaPage.classList.remove('hide');
    showQuestion();
}

function showQuestion() {
    const question = questions[currentQuestionIndex];
    questionTitle.innerHTML = question.q;
    answerBtns[0].innerHTML = question.a[0].text;
    answerBtns[1].innerHTML = question.a[1].text;
    progressBar.style.width = ((currentQuestionIndex) / questions.length) * 100 + '%';
    qCounter.innerText = `${currentQuestionIndex + 1} / ${questions.length}`;
    backBtn.parentElement.style.visibility = currentQuestionIndex === 0 ? 'hidden' : 'visible';
}

function selectAnswer(answerIndex) {
    if (currentQuestionIndex >= questions.length) return;
    
    const selectedType = questions[currentQuestionIndex].a[answerIndex].type;
    userAnswers[currentQuestionIndex] = selectedType;
    currentQuestionIndex++;

    if (currentQuestionIndex === questions.length) {
        progressBar.style.width = '100%';
        setTimeout(() => showResult(), 500);
    } else {
        showQuestion();
    }
}

function goBack() {
    if (currentQuestionIndex === 0) return;
    currentQuestionIndex--;
    showQuestion();
}

function showResult(resultTypeFromUrl = null) {
    cardWrapper.classList.add('hide');
    resultContainer.classList.remove('hide');

    let finalType;
    if (resultTypeFromUrl) {
        finalType = resultTypeFromUrl;
    } else {
        let score = { S: 0, A: 0, T: 0, P: 0 };
        userAnswers.forEach(answer => { if (answer) score[answer]++; });
        const firstChar = score.S >= score.A ? 'S' : 'A';
        const secondChar = score.T >= score.P ? 'T' : 'P';
        finalType = firstChar + secondChar;
        logDataToSheet(finalType);
    }
    
    currentResultType = finalType;
    const result = results[finalType];
    const bestMatch = results[result.best_code];
    const worstMatch = results[result.worst_code];

    resultPage.innerHTML = `
        <div class="result-card">
            <h3 id="result-summary">${result.summary}</h3>
            <h1 id="result-type">${result.type}</h1>
            <div class="result-emoji">
                <img src="./${result.mascot}" alt="${result.type}">
            </div>
            <div id="result-tags" class="tags-box">
                ${result.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
            <div class="desc-box">
                <p id="result-desc">${result.desc}</p>
            </div>
        </div>
        <div class="match-box">
            <div class="match-item">
                <h4>환상의 케미</h4>
                <div class="match-emoji">
                    <img src="./${bestMatch.mascot}" alt="${bestMatch.type}">
                </div>
                <div class="match-text">
                    <span id="best-match">${bestMatch.type}</span>
                </div>
            </div>
            <div class="match-item">
                <h4>환장의 케미</h4>
                <div class="match-emoji">
                    <img src="./${worstMatch.mascot}" alt="${worstMatch.type}">
                </div>
                <div class="match-text">
                    <span id="worst-match">${worstMatch.type}</span>
                </div>
            </div>
        </div>
        <div class="result-footer">
            <button onclick="shareResult()" class="share-btn">내 검사결과 공유하기</button>
            <button onclick="restartTest()" class="restart-btn">테스트 다시하기</button>
        </div>
    `;
}

function logDataToSheet(resultType) {
    if (!SCRIPT_URL.includes("macros.google.com")) {
        console.log("스크립트 URL이 유효하지 않아 데이터를 기록하지 않습니다.");
        return;
    }
    fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ result: resultType })
    })
    .then(() => console.log('데이터 전송 성공'))
    .catch(error => console.error('Error:', error));
}

function restartTest() {
    window.location.href = window.location.pathname;
}

function shareResult() {
    const baseUrl = window.location.origin + window.location.pathname;
    const shareUrl = `${baseUrl}?result=${currentResultType}`;
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(shareUrl).then(() => {
            alert("결과 링크가 복사되었습니다! 공유해보세요.");
        }).catch(() => {
            alert("링크 복사에 실패했습니다.");
        });
    } else {
        alert("결과 공유 기능은 준비 중입니다.");
    }
}
