// ইমেজ ডাউনলোডার ফাংশন (থিম ডিটেকশন সহ)
function downloadAsImage() {
    const element = document.getElementById('capture-target');
    const actionSection = document.getElementById('action-section');
    
    // বর্তমান ব্যাকগ্রাউন্ড কালার ডিটেক্ট করা (যাতে ডার্ক মোডে কালো এবং লাইট মোডে সাদা ব্যাকগ্রাউন্ড আসে)
    const computedStyle = getComputedStyle(element);
    const currentBgColor = computedStyle.backgroundColor;

    // বাটনগুলো লুকানো (ইমেজে যেন না আসে)
    actionSection.style.display = 'none';
    
    // বর্ডার এবং শ্যাডো সাময়িকভাবে সরানো (ক্লিন লুকের জন্য)
    const originalShadow = element.style.boxShadow;
    const originalBorder = element.style.border;
    element.style.boxShadow = 'none';
    element.style.border = 'none';

    html2canvas(element, {
        scale: 2, // High Quality
        useCORS: true,
        backgroundColor: currentBgColor, // ডায়নামিক ব্যাকগ্রাউন্ড
        logging: false
    }).then(canvas => {
        // লেআউট রিস্টোর করা
        actionSection.style.display = 'block';
        element.style.boxShadow = originalShadow;
        element.style.border = originalBorder;

        // ডাউনলোড ট্রিগার করা
        const link = document.createElement('a');
        link.download = 'Result_2026.jpg';
        link.href = canvas.toDataURL('image/jpeg', 0.9);
        link.click();
    }).catch(err => {
        console.error("Error:", err);
        // এরর হলেও বাটন যেন ফিরে আসে
        actionSection.style.display = 'block';
    });
}

// শাটার খোলার ফাংশন
function toggleOldResult(btn) {
    const panel = document.getElementById('oldResultPanel');
    panel.classList.toggle('show');
    btn.classList.toggle('active');
    
    // আইকন রিলোড করার জন্য
    if(window.lucide) {
        lucide.createIcons();
    }
}

// Initialize Icons
lucide.createIcons();
const ballotImageUrl = "GonoVoteBallot.jpg"; 

// Updated File Data: Clean descriptions and separate Date property
const files = [
    { 
        title: "জুলাই জাতীয় সনদ ২০২৫", 
        size: "৮.৩৭১ এমবি", 
        icon: "scroll", 
        link: "July_Jatiya_Sanad_2025.pdf", 
        desc: "রাষ্ট্রের সংস্কার ও চরিত্র বদলের মূল অঙ্গীকারনামা এবং ভবিষ্যতের রূপরেখা।",
        date: "১৭ অক্টোবর, ২০২৫"
    },
    { 
        title: "জুলাই জাতীয় সনদ (সংবিধান সংস্কার) বাস্তবায়ন আদেশ, ২০২৫", 
        size: "১৬১ কেবি", 
        icon: "file-check", 
        link: "July_Jatiya_Sanad_Bastobayan_Adesh.pdf", 
        desc: "জুলাই জাতীয় সনদ বাস্তবায়নের প্রশাসনিক নির্দেশাবলী এবং আইনি আদেশ।",
        date: "১৩ নভেম্বর, ২০২৫"
    },
    { 
        title: "গণভোট অধ্যাদেশ, ২০২৫", 
        size: "২২৭ কেবি", 
        icon: "shield-check", 
        link: "Gonovoter_Bidhan_Pronoyon_Kolpe_Oddhadesh.pdf", 
        desc: "গণভোট অনুষ্ঠানের আইনি ভিত্তি এবং বিধিমালা সংক্রান্ত চূড়ান্ত সরকারি অধ্যাদেশ।",
        date: "২৫ নভেম্বর, ২০২৫"
    },
    { 
        title: "গণভোট সংক্রান্ত পরিপত্র", 
        size: "৮০৬ কেবি", 
        icon: "pen-tool", 
        link: "Gonovote_Songkranto_Poripotro.pdf", 
        desc: "গণভোট সংক্রান্ত নির্বাচন কমিশনের বিশেষ নির্দেশনা ও মাঠ পর্যায়ের কর্মকর্তাদের জন্য গাইডলাইন।",
        date: "১১ ডিসেম্বর, ২০২৫"
    },
    { 
        title: "গণভোটের ব্যালট পেপার", 
        size: "৪.২৬৫ এমবি", 
        icon: "image", 
        link: "GonoVoteBallot.jpg", 
        desc: "ভোটারদের সুবিধার্থে গণভোটের গোলাপী রঙের ব্যালট পেপারের চিত্র।",
        date: "১১ ডিসেম্বর, ২০২৫"
    },
    { 
        title: "প্রচারণা লিফলেট", 
        size: "৫৯৮ কেবি", 
        icon: "megaphone", 
        link: "leaflet.pdf", 
        desc: "জনসচেতনতামূলক ডিজিটাল লিফলেট যেখানে সংস্কারের মূল পয়েন্টগুলো সংক্ষেপে তুলে ধরা হয়েছে।",
        date: "" // No date for this item
    }
];

const grid = document.getElementById('fileGrid');

function renderFiles() {
    grid.innerHTML = "";
    files.forEach(file => {
        // Create special ID for the Sanad card
        const cardId = file.link === "July_Jatiya_Sanad_2025.pdf" ? 'id="sanadCard"' : '';
        
        grid.innerHTML += `
            <div class="card" ${cardId}>
                <div class="icon-box"><i data-lucide="${file.icon}" size="20"></i></div>
                <div class="card-body">
                    <h3 class="card-title">${file.title}</h3>
                    
                    <p class="card-description" style="margin-bottom: 6px; line-height: 1.4;">${file.desc}</p>
                    
                    ${file.date ? `<p class="card-date" style="font-weight: bold; margin-bottom: 6px; opacity: 1;">প্রকাশ: ${file.date}</p>` : ''}
                    
                    <p style="font-size: 0.9rem; font-weight: 700; opacity: 0.7; color: var(--primary); margin-bottom: 15px;">
                        FILE | ${file.size}
                    </p>
                </div>
                <div class="btn-group" style="display: flex; gap: 8px;">
                    <a href="${file.link}" target="_blank" class="btn btn-preview" style="font-size: 0.85rem; padding: 8px 12px; display: inline-flex; justify-content: center; align-items: center; text-decoration: none; flex: 1;"> 📖 পড়ুন</a>
                    <a href="${file.link}" download class="btn btn-download" style="font-size: 0.85rem; padding: 8px 12px; display: inline-flex; justify-content: center; align-items: center; text-decoration: none; flex: 1;"> 📥 ডাউনলোড</a>
                </div>
            </div>`;
    });
    lucide.createIcons();
}
renderFiles();

// Scroll and Red Flash Highlight Function
function scrollToSanad() {
    const sanadCard = document.getElementById('sanadCard');
    if (sanadCard) {
        sanadCard.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Apply Red Flash Effect
        sanadCard.style.transition = 'all 0.4s ease-in-out';
        sanadCard.style.transform = 'scale(1.03)';
        
        // Set Red Border and Background
        sanadCard.style.borderColor = '#dc2626'; 
        sanadCard.style.backgroundColor = 'rgba(220, 38, 38, 0.15)'; 
        sanadCard.style.boxShadow = '0 0 35px rgba(220, 38, 38, 0.5)'; 

        // Reset after 1.5 seconds
        setTimeout(() => {
            sanadCard.style.transform = '';
            sanadCard.style.borderColor = ''; 
            sanadCard.style.backgroundColor = '';
            sanadCard.style.boxShadow = '';
        }, 1500);
    }
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const targetTheme = currentTheme === 'day' ? 'night' : 'day';
    document.documentElement.setAttribute('data-theme', targetTheme);
    const icon = document.getElementById('themeIcon');
    icon.setAttribute('data-lucide', targetTheme === 'day' ? 'moon' : 'sun');
    lucide.createIcons();
}

function openBallot() {
    const modal = document.getElementById('ballotModal');
    document.getElementById('ballotImg').src = ballotImageUrl;
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
}
function closeBallot() {
    document.getElementById('ballotModal').style.display = "none";
    document.body.style.overflow = "auto";
}

function updateCountdown() {
    const targetDate = new Date("February 12, 2026 07:30:00").getTime();
    
    function tick() {
        const now = new Date().getTime();
        const distance = targetDate - now;
        
        if (distance < 0) {
            document.querySelector('.timer-section').innerHTML = "<h5 style='color:var(--primary); font-size: 1.2rem; font-weight: 800;'>নির্দিষ্ট সময়ে ভোট গ্রহণ সম্পন্ন হয়।</h5>";
            return;
        }
        
        document.getElementById("days").innerText = Math.floor(distance / (1000 * 60 * 60 * 24));
        document.getElementById("hours").innerText = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        document.getElementById("minutes").innerText = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        document.getElementById("seconds").innerText = Math.floor((distance % (1000 * 60)) / 1000);
    }
    
    tick(); 
    setInterval(tick, 1000);
}

window.addEventListener('load', updateCountdown);
