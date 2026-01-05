document.addEventListener('DOMContentLoaded', function() {
    const homeDiv = document.getElementById('home');
    const recordPageDiv = document.getElementById('recordPage');
    const diaryPageDiv = document.getElementById('diaryPage');
    const mealPageDiv = document.getElementById('mealPage');
    const todoPageDiv = document.getElementById('todoPage');
    const sleepPageDiv = document.getElementById('sleepPage');
    const stepsPageDiv = document.getElementById('stepsPage');
    const weightBtn = document.getElementById('weightBtn');
    const diaryBtn = document.getElementById('diaryBtn');
    const mealBtn = document.getElementById('mealBtn');
    const todoBtn = document.getElementById('todoBtn');
    const sleepBtn = document.getElementById('sleepBtn');
    const stepsBtn = document.getElementById('stepsBtn');
    const backBtns = document.querySelectorAll('.backBtn');
    const form = document.getElementById('recordForm');
    const recordsDiv = document.getElementById('records');
    let myChart;

    // 都道府県リスト
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
        '埼玉 さいたま', '埼玉 川口', '埼玉 川越', '埼玉 熊谷',
        '千葉 千葉', '千葉 船橋', '千葉 松戸', '千葉 柏',
        '東京 東京', '東京 渋谷', '東京 新宿', '東京 品川',
        '神奈川 横浜', '神奈川 川崎', '神奈川 相模原', '神奈川 横須賀',
        '新潟 新潟', '新潟 長岡', '新潟 上越', '新潟 柏崎',
        '富山 富山', '富山 高岡', '富山 魚津', '富山 滑川',
        '石川 金沢', '石川 七尾', '石川 小松', '石川 輪島',
        '福井 福井', '福井 敦賀', '福井 小浜', '福井 大野',
        '山梨 甲府', '山梨 富士吉田', '山梨 都留', '山梨 大月',
        '長野 長野', '長野 松本', '長野 上田', '長野 飯田',
        '岐阜 岐阜', '岐阜 大垣', '岐阜 高山', '岐阜 多治見',
        '静岡 静岡', '静岡 浜松', '静岡 沼津', '静岡 富士',
        '愛知 名古屋', '愛知 豊橋', '愛知 岡崎', '愛知 一宮',
        '三重 津', '三重 四日市', '三重 伊勢', '三重 松阪',
        '滋賀 大津', '滋賀 彦根', '滋賀 長浜', '滋賀 近江八幡',
        '京都 京都', '京都 宇治', '京都 福知山', '京都 舞鶴',
        '大阪 大阪', '大阪 堺', '大阪 岸和田', '大阪 豊中',
        '兵庫 神戸', '兵庫 姫路', '兵庫 尼崎', '兵庫 明石',
        '奈良 奈良', '奈良 橿原', '奈良 生駒', '奈良 香芝',
        '和歌山 和歌山', '和歌山 田辺', '和歌山 新宮', '和歌山 橋本',
        '鳥取 鳥取', '鳥取 米子', '鳥取 倉吉', '鳥取 境港',
        '島根 松江', '島根 出雲', '島根 浜田', '島根 益田',
        '岡山 岡山', '岡山 倉敷', '岡山 津山', '岡山 玉野',
        '広島 広島', '広島 福山', '広島 呉', '広島 三原',
        '山口 山口', '山口 下関', '山口 宇部', '山口 萩',
        '徳島 徳島', '徳島 阿南', '徳島 小松島', '徳島 美馬',
        '香川 高松', '香川 丸亀', '香川 坂出', '香川 善通寺',
        '愛媛 松山', '愛媛 今治', '愛媛 新居浜', '愛媛 西条',
        '高知 高知', '高知 土佐清水', '高知 宿毛', '高知 須崎',
        '福岡 福岡', '福岡 北九州', '福岡 大牟田', '福岡 久留米',
        '佐賀 佐賀', '佐賀 唐津', '佐賀 鳥栖', '佐賀 武雄',
        '長崎 長崎', '長崎 佐世保', '長崎 平戸', '長崎 島原',
        '熊本 熊本', '熊本 八代', '熊本 人吉', '熊本 玉名',
        '大分 大分', '大分 別府', '大分 中津', '大分 日田',
        '宮崎 宮崎', '宮崎 延岡', '宮崎 日南', '宮崎 小林',
        '鹿児島 鹿児島', '鹿児島 奄美', '鹿児島 指宿', '鹿児島 薩摩川内',
        '沖縄 那覇', '沖縄 石垣', '沖縄 浦添', '沖縄 名護'
    ];
    let gamePlayerPosition = parseInt(localStorage.getItem('gamePlayerPosition')) || 0;
    let gamePoints = parseInt(localStorage.getItem('gamePoints')) || 0;

    // ボタンクリックで各ページへ
    weightBtn.addEventListener('click', function() {
        showPage(recordPageDiv);
        displayRecords();
    });

    diaryBtn.addEventListener('click', function() {
        showPage(diaryPageDiv);
        displayDiary();
    });

    mealBtn.addEventListener('click', function() {
        showPage(mealPageDiv);
        displayMeals();
    });

    todoBtn.addEventListener('click', function() {
        showPage(todoPageDiv);
        displayTodos();
    });

    sleepBtn.addEventListener('click', function() {
        showPage(sleepPageDiv);
        displaySleep();
        updateSleepChart();
    });

    stepsBtn.addEventListener('click', function() {
        showPage(stepsPageDiv);
        displaySteps();
        drawGameMap();
        updateGameStatus();
    });

    // 戻るボタンでホームへ
    backBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            hideAllPages();
            homeDiv.style.display = 'block';
        });
    });

    function showPage(pageDiv) {
        hideAllPages();
        pageDiv.style.display = 'block';
    }

    function hideAllPages() {
        recordPageDiv.style.display = 'none';
        diaryPageDiv.style.display = 'none';
        mealPageDiv.style.display = 'none';
        todoPageDiv.style.display = 'none';
        sleepPageDiv.style.display = 'none';
        stepsPageDiv.style.display = 'none';
        homeDiv.style.display = 'none';
    }

    // ボタンクリックで各ページへ
    weightBtn.addEventListener('click', function() {
        showPage(recordPageDiv);
        displayRecords();
    });

    diaryBtn.addEventListener('click', function() {
        showPage(diaryPageDiv);
        displayDiary();
    });

    mealBtn.addEventListener('click', function() {
        showPage(mealPageDiv);
        displayMeals();
    });

    todoBtn.addEventListener('click', function() {
        showPage(todoPageDiv);
        displayTodos();
    });

    sleepBtn.addEventListener('click', function() {
        showPage(sleepPageDiv);
        displaySleep();
    });

    // 戻るボタンでホームへ
    backBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            hideAllPages();
            homeDiv.style.display = 'block';
        });
    });

    // 体重記録機能
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const weight = document.getElementById('weight').value;
        const date = new Date().toLocaleString('ja-JP');

        const record = {
            date: date,
            weight: weight
        };

        let records = JSON.parse(localStorage.getItem('healthRecords')) || [];
        records.push(record);
        localStorage.setItem('healthRecords', JSON.stringify(records));

        form.reset();
        displayRecords();
    });

    function displayRecords() {
        const records = JSON.parse(localStorage.getItem('healthRecords')) || [];
        recordsDiv.innerHTML = '<h2>過去の記録</h2>';
        records.forEach((record, index) => {
            const recordDiv = document.createElement('div');
            recordDiv.className = 'record';
            recordDiv.innerHTML = `
                <p><strong>日時:</strong> ${record.date}</p>
                <p><strong>体重:</strong> ${record.weight} kg</p>
                <button onclick="deleteRecord(${index})">削除</button>
            `;
            recordsDiv.appendChild(recordDiv);
        });
        updateChart(records);
    }

    window.deleteRecord = function(index) {
        let records = JSON.parse(localStorage.getItem('healthRecords')) || [];
        records.splice(index, 1);
        localStorage.setItem('healthRecords', JSON.stringify(records));
        displayRecords();
    };

    function updateChart(records) {
        const ctx = document.getElementById('myChart').getContext('2d');
        const labels = records.map(record => record.date);
        const weights = records.map(record => parseFloat(record.weight));

        if (myChart) {
            myChart.destroy();
        }

        myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: '体重 (kg)',
                    data: weights,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        title: {
                            display: true,
                            text: '体重 (kg)'
                        }
                    }
                }
            }
        });
    }

    // 日記機能
    const diaryForm = document.getElementById('diaryForm');
    const diaryEntriesDiv = document.getElementById('diaryEntries');

    diaryForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const text = document.getElementById('diaryText').value;
        const date = new Date().toLocaleString('ja-JP');

        const entry = {
            date: date,
            text: text
        };

        let entries = JSON.parse(localStorage.getItem('diaryEntries')) || [];
        entries.push(entry);
        localStorage.setItem('diaryEntries', JSON.stringify(entries));

        diaryForm.reset();
        displayDiary();
    });

    function displayDiary() {
        const entries = JSON.parse(localStorage.getItem('diaryEntries')) || [];
        diaryEntriesDiv.innerHTML = '<h2>過去の日記</h2>';
        entries.forEach((entry, index) => {
            const entryDiv = document.createElement('div');
            entryDiv.className = 'entry';
            entryDiv.innerHTML = `
                <p><strong>日時:</strong> ${entry.date}</p>
                <p>${entry.text}</p>
                <button onclick="deleteDiary(${index})">削除</button>
            `;
            diaryEntriesDiv.appendChild(entryDiv);
        });
    }

    window.deleteDiary = function(index) {
        let entries = JSON.parse(localStorage.getItem('diaryEntries')) || [];
        entries.splice(index, 1);
        localStorage.setItem('diaryEntries', JSON.stringify(entries));
        displayDiary();
    };

    // 食事記録機能
    const mealForm = document.getElementById('mealForm');
    const mealRecordsDiv = document.getElementById('mealRecords');

    mealForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('mealName').value;
        const date = new Date().toLocaleString('ja-JP');

        const record = {
            date: date,
            name: name
        };

        let records = JSON.parse(localStorage.getItem('mealRecords')) || [];
        records.push(record);
        localStorage.setItem('mealRecords', JSON.stringify(records));

        mealForm.reset();
        displayMeals();
    });

    function displayMeals() {
        const records = JSON.parse(localStorage.getItem('mealRecords')) || [];
        mealRecordsDiv.innerHTML = '<h2>過去の食事</h2>';
        records.forEach((record, index) => {
            const recordDiv = document.createElement('div');
            recordDiv.className = 'record';
            recordDiv.innerHTML = `
                <p><strong>日時:</strong> ${record.date}</p>
                <p><strong>内容:</strong> ${record.name}</p>
                <button onclick="deleteMeal(${index})">削除</button>
            `;
            mealRecordsDiv.appendChild(recordDiv);
        });
    }

    window.deleteMeal = function(index) {
        let records = JSON.parse(localStorage.getItem('mealRecords')) || [];
        records.splice(index, 1);
        localStorage.setItem('mealRecords', JSON.stringify(records));
        displayMeals();
    };

    // TODOリスト機能
    const todoForm = document.getElementById('todoForm');
    const todoListUl = document.getElementById('todoList');

    todoForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const task = document.getElementById('todoTask').value;

        let todos = JSON.parse(localStorage.getItem('todoList')) || [];
        todos.push({ task: task, done: false });
        localStorage.setItem('todoList', JSON.stringify(todos));

        todoForm.reset();
        displayTodos();
    });

    function displayTodos() {
        const todos = JSON.parse(localStorage.getItem('todoList')) || [];
        todoListUl.innerHTML = '';
        todos.forEach((todo, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span class="${todo.done ? 'done' : ''}">${todo.task}</span>
                <button onclick="toggleTodo(${index})">${todo.done ? '未完了' : '完了'}</button>
                <button onclick="deleteTodo(${index})">削除</button>
            `;
            todoListUl.appendChild(li);
        });
    }

    window.toggleTodo = function(index) {
        let todos = JSON.parse(localStorage.getItem('todoList')) || [];
        todos[index].done = !todos[index].done;
        localStorage.setItem('todoList', JSON.stringify(todos));
        displayTodos();
    };

    window.deleteTodo = function(index) {
        let todos = JSON.parse(localStorage.getItem('todoList')) || [];
        todos.splice(index, 1);
        localStorage.setItem('todoList', JSON.stringify(todos));
        displayTodos();
    };

    // 睡眠記録機能
    const wakeBtn = document.getElementById('wakeBtn');
    const bedBtn = document.getElementById('bedBtn');
    const recordWakeBtn = document.getElementById('recordWakeBtn');
    const recordBedBtn = document.getElementById('recordBedBtn');
    const sleepRecordsDiv = document.getElementById('sleepRecords');
    let sleepChart;

    wakeBtn.addEventListener('click', function() {
        document.getElementById('wakeForm').style.display = 'block';
    });

    bedBtn.addEventListener('click', function() {
        document.getElementById('bedForm').style.display = 'block';
    });

    recordWakeBtn.addEventListener('click', function() {
        const time = document.getElementById('wakeTimeInput').value;
        if (!time) return;
        const date = new Date().toLocaleDateString('ja-JP');

        let wakeTimes = JSON.parse(localStorage.getItem('wakeTimes')) || [];
        wakeTimes.push({ date: date, time: time });
        localStorage.setItem('wakeTimes', JSON.stringify(wakeTimes));

        document.getElementById('wakeForm').style.display = 'none';
        displaySleep();
        updateSleepChart();
    });

    recordBedBtn.addEventListener('click', function() {
        const time = document.getElementById('bedTimeInput').value;
        if (!time) return;
        const date = new Date().toLocaleDateString('ja-JP');

        let bedTimes = JSON.parse(localStorage.getItem('bedTimes')) || [];
        bedTimes.push({ date: date, time: time });
        localStorage.setItem('bedTimes', JSON.stringify(bedTimes));

        document.getElementById('bedForm').style.display = 'none';
        displaySleep();
        updateSleepChart();
    });

    function displaySleep() {
        const wakeTimes = JSON.parse(localStorage.getItem('wakeTimes')) || [];
        const bedTimes = JSON.parse(localStorage.getItem('bedTimes')) || [];
        const sleepDurations = calculateSleepDurations();

        sleepRecordsDiv.innerHTML = '<h2>過去の睡眠</h2>';
        sleepDurations.forEach((duration, index) => {
            const recordDiv = document.createElement('div');
            recordDiv.className = 'record';
            recordDiv.innerHTML = `
                <p><strong>日付:</strong> ${duration.date}</p>
                <p><strong>睡眠時間:</strong> ${duration.hours} 時間 ${duration.minutes} 分</p>
            `;
            sleepRecordsDiv.appendChild(recordDiv);
        });
    }

    function calculateSleepDurations() {
        const wakeTimes = JSON.parse(localStorage.getItem('wakeTimes')) || [];
        const bedTimes = JSON.parse(localStorage.getItem('bedTimes')) || [];
        const durations = [];

        // 日付ごとにグループ化
        const wakeMap = {};
        wakeTimes.forEach(w => {
            if (!wakeMap[w.date]) wakeMap[w.date] = [];
            wakeMap[w.date].push(w.time);
        });

        const bedMap = {};
        bedTimes.forEach(b => {
            if (!bedMap[b.date]) bedMap[b.date] = [];
            bedMap[b.date].push(b.time);
        });

        // 各日の睡眠時間を計算
        Object.keys(wakeMap).forEach(date => {
            const wakes = wakeMap[date];
            const beds = bedMap[date] || [];
            const prevBeds = bedMap[new Date(date).toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })] || []; // 前日

            wakes.forEach(wake => {
                let bedTime = null;
                // 当日の就寝を探す
                beds.forEach(bed => {
                    if (bed < wake) bedTime = bed;
                });
                // 前日の就寝を探す
                if (!bedTime) {
                    prevBeds.forEach(bed => {
                        bedTime = bed;
                    });
                }
                if (bedTime) {
                    const wakeDate = new Date(`${date} ${wake}`);
                    const bedDate = new Date(`${date} ${bedTime}`);
                    if (bedDate > wakeDate) bedDate.setDate(bedDate.getDate() - 1); // 前日の場合
                    const diff = wakeDate - bedDate;
                    const hours = Math.floor(diff / (1000 * 60 * 60));
                    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                    durations.push({ date: date, hours: hours, minutes: minutes });
                }
            });
        });

        return durations;
    }

    function updateSleepChart() {
        const durations = calculateSleepDurations();
        const ctx = document.getElementById('sleepChart').getContext('2d');
        const labels = durations.map(d => d.date);
        const data = durations.map(d => d.hours + d.minutes / 60);

        if (sleepChart) {
            sleepChart.destroy();
        }

        sleepChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: '睡眠時間 (時間)',
                    data: data,
                    borderColor: 'rgba(54, 162, 235, 1)',
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        title: {
                            display: true,
                            text: '睡眠時間 (時間)'
                        }
                    }
                }
            }
        });
    }

    // 歩数記録機能
    const stepsForm = document.getElementById('stepsForm');
    const stepsRecordsDiv = document.getElementById('stepsRecords');

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
        let previousPosition = gamePlayerPosition;
        gamePlayerPosition += moves;
        if (gamePlayerPosition >= locations.length) {
            gamePlayerPosition = locations.length - 1;
        }
        if (gamePlayerPosition >= locations.length - 1) {
            gamePlayerPosition = 0;
            localStorage.setItem('gamePlayerPosition', gamePlayerPosition);
        }
        if (gamePlayerPosition > previousPosition) {
            const newLocations = gamePlayerPosition - previousPosition;
            gamePoints += newLocations * 10;
            localStorage.setItem('gamePoints', gamePoints);
        }
        localStorage.setItem('gamePlayerPosition', gamePlayerPosition);
        drawGameMap();
        updateGameStatus();
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

    // ゲーム機能
    const resetGameBtn = document.getElementById('resetGameBtn');
    resetGameBtn.addEventListener('click', function() {
        gamePlayerPosition = 0;
        gamePoints = 0;
        localStorage.setItem('gamePlayerPosition', 0);
        localStorage.setItem('gamePoints', 0);
        drawGameMap();
        updateGameStatus();
    });

    function drawGameMap() {
        const mapDiv = document.getElementById('gameMap');
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
        updateGamePlayerPosition(player);
        mapDiv.appendChild(player);
    }

    function updateGamePlayerPosition(player) {
        const row = Math.floor(gamePlayerPosition / 10);
        const col = gamePlayerPosition % 10;
        const cellWidth = 350 / 10;
        const cellHeight = 350 / 10;
        player.style.top = `${row * cellHeight}px`;
        player.style.left = `${col * cellWidth}px`;
    }

    function updateGameStatus() {
        const statusDiv = document.getElementById('gameStatus');
        if (gamePlayerPosition >= locations.length - 1) {
            statusDiv.textContent = `ゴールに到達しました！おめでとう！ 総ポイント: ${gamePoints}`;
        } else {
            statusDiv.textContent = `現在の位置: ${locations[gamePlayerPosition]} | ポイント: ${gamePoints}`;
        }
    }

    // ホームボタンでホームへ
    const homeBtns = document.querySelectorAll('.homeBtn');
    homeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            hideAllPages();
            homeDiv.style.display = 'block';
        });
    });

    // カレンダー描画
    drawCalendar();

    function drawCalendar() {
        const calendarDiv = document.getElementById('calendar');
        calendarDiv.innerHTML = '<h2>カレンダー</h2>';
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startDay = firstDay.getDay();

        let html = '<table><tr><th>日</th><th>月</th><th>火</th><th>水</th><th>木</th><th>金</th><th>土</th></tr><tr>';
        for (let i = 0; i < startDay; i++) {
            html += '<td></td>';
        }
        for (let day = 1; day <= daysInMonth; day++) {
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            html += `<td><button onclick="showDayData('${dateStr}')">${day}</button></td>`;
            if ((startDay + day) % 7 === 0) {
                html += '</tr><tr>';
            }
        }
        html += '</tr></table>';
        calendarDiv.innerHTML += html;
    }

    window.showDayData = function(date) {
        const dayDataDiv = document.getElementById('dayData');
        const weight = getWeightOnDate(date);
        const steps = getStepsOnDate(date);
        const meals = getMealsOnDate(date);
        const sleep = getSleepOnDate(date);
        const diary = getDiaryOnDate(date);

        let html = `<h3>${date} のデータ</h3>`;
        html += `<p>体重: ${weight.length ? weight.join(', ') : 'なし'}</p>`;
        html += `<p>歩数: ${steps.length ? steps.join(', ') : 'なし'}</p>`;
        html += `<p>食事: ${meals.length ? meals.join(', ') : 'なし'}</p>`;
        html += `<p>睡眠: ${sleep.length ? sleep.join(', ') : 'なし'}</p>`;
        html += `<p>日記: ${diary.length ? diary.join(', ') : 'なし'}</p>`;
        dayDataDiv.innerHTML = html;
    };

    function getWeightOnDate(date) {
        const records = JSON.parse(localStorage.getItem('healthRecords')) || [];
        return records.filter(r => r.date.startsWith(date.replace(/-/g, '/'))).map(r => r.weight);
    }

    function getStepsOnDate(date) {
        const records = JSON.parse(localStorage.getItem('stepsRecords')) || [];
        return records.filter(r => r.date.startsWith(date.replace(/-/g, '/'))).map(r => r.steps);
    }

    function getMealsOnDate(date) {
        const records = JSON.parse(localStorage.getItem('mealRecords')) || [];
        return records.filter(r => r.date.startsWith(date.replace(/-/g, '/'))).map(r => r.name);
    }

    function getSleepOnDate(date) {
        const durations = calculateSleepDurations();
        return durations.filter(d => d.date === date.replace(/-/g, '/')).map(d => `${d.hours}時間${d.minutes}分`);
    }

    function getDiaryOnDate(date) {
        const records = JSON.parse(localStorage.getItem('diaryEntries')) || [];
        return records.filter(r => r.date.startsWith(date.replace(/-/g, '/'))).map(r => r.text);
    }

    // 初期表示
    homeDiv.style.display = 'block';
});
