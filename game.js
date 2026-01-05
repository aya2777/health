document.addEventListener('DOMContentLoaded', function() {
    const stepsForm = document.getElementById('stepsForm');
    const stepsRecordsDiv = document.getElementById('stepsRecords');
    const mapDiv = document.getElementById('map');
    const statusDiv = document.getElementById('status');
    const locations = [
        '北海道 札幌', '北海道 函館', '北海道 小樽', '北海道 旭川',
        '青森 青森', '青森 弘前', '青森 八戸', '青森 むつ',
        '岩手 盛岡', '岩手 宮古', '岩手 大船渡', '岩手 花巻',
        '宮城 仙台', '宮城 石巻', '宮城 塩竈', '宮城 白石',
        '秋田 秋田', '秋田 横手', '秋田 大館', '秋田 能代',
        '山形 山形', '山形 米沢', '山形 鶴岡', '山形 酒田',
        '福島 福島', '福島 会津若松', '福島 郡山', '福島 いわき',
        '茨城 水戸', '茨城 つくば', '茨城 日立', '茨城 土浦',
        '栃木 宇都宮', '栃木 日光', '栃木 小山', '栃木 栃木',
        '群馬 前橋', '群馬 高崎', '群馬 桐生', '群馬 伊勢崎',
        '埼玉 さいたま', '埼玉 川口',
        '千葉 千葉', '千葉 船橋',
        '東京 東京', '東京 渋谷',
        '神奈川 横浜', '神奈川 川崎',
        '新潟 新潟', '新潟 長岡',
        '富山 富山', '富山 高岡',
        '石川 金沢', '石川 輪島',
        '福井 福井', '福井 敦賀',
        '山梨 甲府', '山梨 富士吉田',
        '長野 長野', '長野 松本',
        '岐阜 岐阜', '岐阜 高山', '岐阜 大垣', '岐阜 多治見',
        '静岡 静岡', '静岡 浜松',
        '愛知 名古屋', '愛知 豊橋',
        '三重 津', '三重 四日市',
        '滋賀 大津', '滋賀 彦根',
        '京都 京都', '京都 宇治',
        '大阪 大阪', '大阪 堺',
        '兵庫 神戸', '兵庫 姫路',
        '奈良 奈良', '奈良 橿原',
        '和歌山 和歌山', '和歌山 田辺',
        '鳥取 鳥取', '鳥取 米子',
        '島根 松江', '島根 出雲',
        '岡山 岡山', '岡山 倉敷',
        '広島 広島', '広島 福山',
        '山口 山口', '山口 下関',
        '徳島 徳島', '徳島 阿南',
        '香川 高松', '香川 丸亀',
        '愛媛 松山', '愛媛 今治',
        '高知 高知', '高知 土佐清水',
        '福岡 福岡', '福岡 北九州',
        '佐賀 佐賀', '佐賀 唐津',
        '長崎 長崎', '長崎 佐世保',
        '熊本 熊本', '熊本 八代',
        '大分 大分', '大分 別府', '大分 中津', '大分 日田',
        '宮崎 宮崎', '宮崎 延岡', '宮崎 日南', '宮崎 小林',
        '鹿児島 鹿児島', '鹿児島 奄美', '鹿児島 指宿', '鹿児島 薩摩川内',
        '沖縄 那覇', '沖縄 石垣', '沖縄 浦添', '沖縄 名護'
    ];
    let playerPosition = parseInt(localStorage.getItem('playerPosition')) || 0;
    let playerPoints = parseInt(localStorage.getItem('playerPoints')) || 0;

    // 歩数記録機能
    stepsForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const steps = parseInt(document.getElementById('dailySteps').value);
        const date = new Date().toLocaleString('ja-JP');

        const record = {
            date: date,
            steps: steps
        };

        let records = JSON.parse(localStorage.getItem('stepsRecords')) || [];
        records.push(record);
        localStorage.setItem('stepsRecords', JSON.stringify(records));

        stepsForm.reset();
        displaySteps();

        // ゲームに反映
        const moves = Math.floor(steps / 100);
        let previousPosition = playerPosition;
        playerPosition += moves;
        if (playerPosition >= locations.length) {
            playerPosition = locations.length - 1;
        }
        if (playerPosition >= locations.length - 1) {
            playerPosition = 0;
            localStorage.setItem('playerPosition', playerPosition);
        }
        if (playerPosition > previousPosition) {
            const newLocations = playerPosition - previousPosition;
            playerPoints += newLocations * 10;
            localStorage.setItem('playerPoints', playerPoints);
        }
        localStorage.setItem('playerPosition', playerPosition);
        drawMap();
        updateStatus();
    });

    function displaySteps() {
        const records = JSON.parse(localStorage.getItem('stepsRecords')) || [];
        stepsRecordsDiv.innerHTML = '<h2>過去の歩数記録</h2>';
        records.forEach((record, index) => {
            const recordDiv = document.createElement('div');
            recordDiv.className = 'record';
            recordDiv.innerHTML = `
                <p><strong>日時:</strong> ${record.date}</p>
                <p><strong>歩数:</strong> ${record.steps} 歩</p>
                <button onclick="deleteStep(${index})">削除</button>
            `;
            stepsRecordsDiv.appendChild(recordDiv);
        });
    }

    window.deleteStep = function(index) {
        let records = JSON.parse(localStorage.getItem('stepsRecords')) || [];
        records.splice(index, 1);
        localStorage.setItem('stepsRecords', JSON.stringify(records));
        displaySteps();
    };

    // 初期表示
    displaySteps();
    drawMap();
    updateStatus();
    function drawMap() {
        mapDiv.innerHTML = '';
        locations.forEach((loc, index) => {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.textContent = loc;
            if (index === locations.length - 1) {
                cell.classList.add('goal');
            }
            mapDiv.appendChild(cell);
        });

        // プレイヤー要素
        const player = document.createElement('div');
        player.className = 'player';
        player.textContent = '🚶';
        updatePlayerPosition(player);
        mapDiv.appendChild(player);
    }

    // プレイヤー位置更新
    function updatePlayerPosition(player) {
        const row = Math.floor(playerPosition / 10);
        const col = playerPosition % 10;
        const cellWidth = 350 / 10;
        const cellHeight = 350 / 10;
        player.style.top = `${row * cellHeight}px`;
        player.style.left = `${col * cellWidth}px`;
    }

    // ステータス更新
    function updateStatus() {
        if (playerPosition >= locations.length - 1) {
            statusDiv.textContent = `ゴールに到達しました！おめでとう！ 総ポイント: ${playerPoints}`;
        } else {
            statusDiv.textContent = `現在の位置: ${locations[playerPosition]} | ポイント: ${playerPoints}`;
        }
    }

    // 初期描画
    drawMap();
    updateStatus();
});