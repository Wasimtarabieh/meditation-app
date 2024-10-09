document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("showDailyMessageBtn").addEventListener("click", showDailyMessage);
    document.getElementById("startTimerBtn").addEventListener("click", startTimer);
    document.getElementById("stopTimerBtn").addEventListener("click", stopTimer);
    updateNewsTicker();
});

let hasReceivedMessage = false;
let interval, initialTime = 0;

function showDailyMessage() {
    if (!hasReceivedMessage) {
        const messages = [
            "تنفس بعمق، وأخرج الهواء ببطء.",
            "ركز على اللحظة الحاضرة.",
            "اشعر بالسلام الداخلي.",
            "اترك كل القلق."
        ];
        const messageIndex = Math.floor(Math.random() * messages.length);
        document.getElementById("message").innerText = messages[messageIndex];
        hasReceivedMessage = true;
    } else {
        alert("لقد حصلت بالفعل على رسالتك اليومية.");
    }
}

function startTimer() {
    resetMeditationSession();
    const timeInput = document.getElementById("time").value;
    if (!timeInput || parseInt(timeInput) <= 0) {
        alert("الرجاء إدخال وقت صالح بالدقائق.");
        return;
    }
    initialTime = parseInt(timeInput) * 60;
    document.getElementById("meditationMusic").play();
    document.getElementById("startTimerBtn").style.display = "none";
    document.getElementById("stopTimerBtn").style.display = "inline";
    clearInterval(interval);
    interval = setInterval(updateTimer, 1000);
}

function updateTimer() {
    if (initialTime <= 0) {
        finishMeditation();
    } else {
        let minutes = Math.floor(initialTime / 60);
        let seconds = initialTime % 60;
        document.getElementById("timer").innerText = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        initialTime--;
    }
}

function finishMeditation() {
    clearInterval(interval);
    document.getElementById("meditationMusic").pause();
    document.getElementById("meditationMusic").currentTime = 0;
    document.getElementById("timer").innerText = "انتهى التأمل";
    showMeditationEndDetails();
    document.getElementById("startTimerBtn").style.display = "inline";
    document.getElementById("stopTimerBtn").style.display = "none";
}

function stopTimer() {
    clearInterval(interval);
    document.getElementById("meditationMusic").pause();
    document.getElementById("meditationMusic").currentTime = 0;
    document.getElementById("timer").innerText = "توقف التأمل";
    initialTime = 0;
    resetMeditationSession();
}

function resetMeditationSession() {
    document.getElementById("message").innerText = "";
    document.getElementById("meditation-time").innerText = "";
    document.getElementById("meditation-quote").innerText = "";
    document.getElementById("meditation-summary").style.display = "none";
    hasReceivedMessage = false;
    document.getElementById("startTimerBtn").style.display = "inline";
    document.getElementById("stopTimerBtn").style.display = "none";
}

function showMeditationEndDetails() {
    const now = new Date();
    document.getElementById("meditation-time").innerText = `تم التأمل بتاريخ: ${now.toLocaleDateString('ar-EG')} الساعة: ${now.toLocaleTimeString('ar-EG')}`;
    document.getElementById("meditation-summary").style.display = "block";
    const quotes = [
        "«التأمل ليس هروبًا؛ إنه العودة إلى الواقع.» - ثيش نهات هانه",
        "«السلام يأتي من الداخل. لا تبحث عنه في الخارج.» - بوذا",
        "«الحياة بسيطة، لكننا نصر على جعلها معقدة.» - كونفوشيوس",
        "«في التأمل، يجد الإنسان الذي يبحث عن نفسه.» - باسكال",
        "«كن سعيدًا في اللحظة، هذه اللحظة هي حياتك.» - عمر الخيام"
    ];
    const quoteIndex = Math.floor(Math.random() * quotes.length);
    document.getElementById("meditation-quote").innerText = quotes[quoteIndex];
}

function updateNewsTicker() {
    const newsContent = document.getElementById("news-content");
    let newsIndex = 0;
    const newsMessages = [
        "التأمل يساعد على تقليل التوتر وتحسين التركيز.",
        "خمس دقائق من التأمل يوميًا يمكن أن تحدث فرقًا كبيرًا.",
        "التأمل يعزز الصحة العقلية والرفاهية العامة.",
        "وقت التأمل ليس وقتًا ضائعًا بل استثمار في صحتك النفسية."
    ];
    setInterval(() => {
        newsContent.innerText = newsMessages[newsIndex++ % newsMessages.length];
    }, 5000);
}

function shareOnWhatsapp() {
    // الحصول على العنصر بناءً على المعرف
    const quoteElement = document.getElementById("meditation-quote");

    // التحقق من أن العنصر موجود ولديه نص
    if (!quoteElement || !quoteElement.innerText.trim()) {
        console.error("No quote available to share or element does not exist.");
        return; // إنهاء الوظيفة إذا لم يتم العثور على نص
    }

    // تحضير الرسالة للمشاركة، مع إضافة نص مسبق
    const baseMessage = "شاركت في جلسة تأمل رائعة! ";
    const fullMessage = baseMessage + quoteElement.innerText.trim(); // إضافة النص من العنصر
    const encodedMessage = encodeURIComponent(fullMessage); // تشفير النص لاستخدامه في URL

    // إنشاء الرابط لواتساب
    const whatsappUrl = `whatsapp://send?text=${encodedMessage}`;

    // فتح رابط واتساب في تطبيق واتساب على الجوال
    window.open(whatsappUrl, '_blank');
}

window.addEventListener('load', function() {
    // كود لتحسين تحميل الصور أو تأخير تحميل الصور غير الضرورية
    document.querySelectorAll("img[data-src]").forEach(img => {
        img.setAttribute('src', img.getAttribute('data-src'));
        img.onload = function() {
            img.removeAttribute('data-src');
        };
    });
});