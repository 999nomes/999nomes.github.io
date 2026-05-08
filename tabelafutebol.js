// Application State
let currentSeries = 'A';
let clubs = [];
let currentTab = 'tabela';
let editingMatchId = null;

// DOM Elements
const tableBody = document.getElementById('table-body');
const tableTitle = document.getElementById('table-title');
const tableLegend = document.getElementById('table-legend');
const btnSerieA = document.getElementById('btn-serie-a');
const btnSerieB = document.getElementById('btn-serie-b');
const addClubForm = document.getElementById('add-club-form');
const addMatchForm = document.getElementById('add-match-form');
const homeTeamSelect = document.getElementById('home-team');
const awayTeamSelect = document.getElementById('away-team');
const matchSeriesLabel = document.getElementById('match-series-label');

// Initialize Application
function init() {
    loadData();
    renderTable();
    renderMatches();
    updateSelectors();
    updateLegend();
    
    addClubForm.addEventListener('submit', handleAddClub);
    addMatchForm.addEventListener('submit', handleAddMatch);
    
    // Default date to today
    document.getElementById('match-date').valueAsDate = new Date();
}

// Load and Save Data
function loadData() {
    const saved = localStorage.getItem('brasileirao_clubs_v2');
    if (saved) {
        clubs = JSON.parse(saved);
    } else {
        // Migration from old version if exists
        const oldSaved = localStorage.getItem('brasileirao_clubs');
        if (oldSaved) {
            clubs = JSON.parse(oldSaved);
            // Add match history array to old clubs
            clubs.forEach(c => c.matchHistory = c.matchHistory || []);
            saveData();
        }
    }
}

function saveData() {
    localStorage.setItem('brasileirao_clubs_v2', JSON.stringify(clubs));
}

// Tab Switching
function switchTab(tabId) {
    currentTab = tabId;
    
    // Update buttons
    document.getElementById('tab-btn-tabela').classList.remove('active');
    document.getElementById('tab-btn-partidas').classList.remove('active');
    document.getElementById(`tab-btn-${tabId}`).classList.add('active');
    
    // Update content
    document.getElementById('tab-tabela').classList.remove('active');
    document.getElementById('tab-partidas').classList.remove('active');
    document.getElementById(`tab-${tabId}`).classList.add('active');
}

// Switch Series
function setSeries(series) {
    currentSeries = series;
    
    if (series === 'A') {
        btnSerieA.classList.add('active');
        btnSerieB.classList.remove('active');
        tableTitle.innerHTML = 'Classificação - Série A';
        matchSeriesLabel.innerHTML = 'A';
    } else {
        btnSerieB.classList.add('active');
        btnSerieA.classList.remove('active');
        tableTitle.innerHTML = 'Classificação - Série B';
        matchSeriesLabel.innerHTML = 'B';
    }
    
    renderTable();
    renderMatches();
    updateSelectors();
    updateLegend();
}

function updateLegend() {
    let html = '';
    if (currentSeries === 'A') {
        html = `
            <div class="legend-item"><div class="legend-color" style="background: var(--liberta-color)"></div> Libertadores (1º ao 4º)</div>
            <div class="legend-item"><div class="legend-color" style="background: var(--pre-liberta-color)"></div> Pré-Libertadores (5º)</div>
            <div class="legend-item"><div class="legend-color" style="background: var(--sula-color)"></div> Sul-Americana (6º ao 11º)</div>
            <div class="legend-item"><div class="legend-color" style="background: var(--relegation-color)"></div> Rebaixamento (17º ao 20º)</div>
        `;
    } else {
        html = `
            <div class="legend-item"><div class="legend-color" style="background: var(--promo-color)"></div> Promoção Série A (1º ao 4º)</div>
            <div class="legend-item"><div class="legend-color" style="background: var(--relegation-color)"></div> Rebaixamento Série C (17º ao 20º)</div>
        `;
    }
    tableLegend.innerHTML = html;
}

// Add New Club
function handleAddClub(e) {
    e.preventDefault();
    const nameInput = document.getElementById('club-name');
    const seriesInput = document.getElementById('club-series');
    
    const name = nameInput.value.trim();
    const series = seriesInput.value;
    
    if (!name) return;
    
    // Check if club already exists
    if (clubs.some(c => c.name.toLowerCase() === name.toLowerCase())) {
        alert('Este clube já está cadastrado.');
        return;
    }
    
    const newClub = {
        id: Date.now().toString(),
        name: name,
        series: series,
        pj: 0, vit: 0, e: 0, der: 0, gm: 0, gc: 0, sg: 0, pts: 0,
        matchHistory: [], // New detailed tracking
        roster: [] // Player roster
    };
    
    clubs.push(newClub);
    saveData();
    
    // Reset form
    nameInput.value = '';
    
    renderTable();
    updateSelectors();
}

// Add Match Result
function handleAddMatch(e) {
    e.preventDefault();
    
    // Inputs
    const date = document.getElementById('match-date').value;
    const round = parseInt(document.getElementById('match-round').value) || 0;
    const isComplete = document.getElementById('match-complete').checked;
    const homeId = homeTeamSelect.value;
    const awayId = awayTeamSelect.value;
    
    if (homeId === awayId) {
        alert('Selecione times diferentes para a partida.');
        return;
    }
    
    const homeTeam = clubs.find(c => c.id === homeId);
    const awayTeam = clubs.find(c => c.id === awayId);
    
    if (!homeTeam || !awayTeam) return;
    
    // Detailed stats
    const matchData = {
        id: editingMatchId ? editingMatchId : Date.now().toString(),
        date: date,
        round: round,
        isComplete: isComplete,
        series: currentSeries,
        home: {
            id: homeTeam.id,
            name: homeTeam.name,
            score: parseInt(document.getElementById('home-score').value) || 0,
            possession: parseInt(document.getElementById('home-possession').value) || 50,
            passes: parseInt(document.getElementById('home-passes').value) || 0,
            corners: parseInt(document.getElementById('home-corners').value) || 0,
            fouls: parseInt(document.getElementById('home-fouls').value) || 0,
            offsides: parseInt(document.getElementById('home-offsides').value) || 0,
            yellowCards: parseInt(document.getElementById('home-yellow').value) || 0,
            redCards: parseInt(document.getElementById('home-red').value) || 0,
            notes: document.getElementById('home-notes').value
        },
        away: {
            id: awayTeam.id,
            name: awayTeam.name,
            score: parseInt(document.getElementById('away-score').value) || 0,
            possession: parseInt(document.getElementById('away-possession').value) || 50,
            passes: parseInt(document.getElementById('away-passes').value) || 0,
            corners: parseInt(document.getElementById('away-corners').value) || 0,
            fouls: parseInt(document.getElementById('away-fouls').value) || 0,
            offsides: parseInt(document.getElementById('away-offsides').value) || 0,
            yellowCards: parseInt(document.getElementById('away-yellow').value) || 0,
            redCards: parseInt(document.getElementById('away-red').value) || 0,
            notes: document.getElementById('away-notes').value
        }
    };
    
    if (editingMatchId) {
        removeMatchStats(editingMatchId);
    }
    
    homeTeam.matchHistory.push(matchData);
    awayTeam.matchHistory.push(matchData);
    
    // Update Table Stats
    updateTeamStats(homeTeam, matchData.home.score, matchData.away.score);
    updateTeamStats(awayTeam, matchData.away.score, matchData.home.score);
    
    saveData();
    
    // Reset inputs but keep date
    document.getElementById('home-score').value = '';
    document.getElementById('home-possession').value = '50';
    document.getElementById('home-passes').value = '0';
    document.getElementById('home-corners').value = '0';
    document.getElementById('home-fouls').value = '0';
    document.getElementById('home-offsides').value = '0';
    document.getElementById('home-yellow').value = '0';
    document.getElementById('home-red').value = '0';
    document.getElementById('home-notes').value = '';

    document.getElementById('away-score').value = '';
    document.getElementById('away-possession').value = '50';
    document.getElementById('away-passes').value = '0';
    document.getElementById('away-corners').value = '0';
    document.getElementById('away-fouls').value = '0';
    document.getElementById('away-offsides').value = '0';
    document.getElementById('away-yellow').value = '0';
    document.getElementById('away-red').value = '0';
    document.getElementById('away-notes').value = '';
    
    document.getElementById('match-round').value = '';
    document.getElementById('match-complete').checked = true;
    
    if (editingMatchId) {
        alert('Partida atualizada com sucesso!');
        editingMatchId = null;
        const submitBtn = document.querySelector('#add-match-form button[type="submit"]');
        submitBtn.textContent = 'Confirmar Partida e Salvar';
        submitBtn.classList.remove('btn-warning');
        submitBtn.classList.add('btn-secondary');
    } else {
        alert('Partida registrada com sucesso!');
    }
    
    renderTable();
    renderMatches();
}

function updateTeamStats(team, goalsFor, goalsAgainst) {
    team.pj += 1;
    team.gm += goalsFor;
    team.gc += goalsAgainst;
    team.sg = team.gm - team.gc;
    
    if (goalsFor > goalsAgainst) {
        team.vit += 1;
        team.pts += 3;
    } else if (goalsFor === goalsAgainst) {
        team.e += 1;
        team.pts += 1;
    } else {
        team.der += 1;
    }
}

// Update Select Options for Matches
function updateSelectors() {
    const seriesClubs = clubs.filter(c => c.series === currentSeries);
    seriesClubs.sort((a, b) => a.name.localeCompare(b.name));
    
    let optionsHtml = '<option value="" disabled selected>Selecione</option>';
    seriesClubs.forEach(club => {
        optionsHtml += `<option value="${club.id}">${club.name}</option>`;
    });
    
    homeTeamSelect.innerHTML = optionsHtml;
    awayTeamSelect.innerHTML = optionsHtml;
}

// Edit and Delete Match
function removeMatchStats(matchId) {
    let matchFound = false;
    clubs.forEach(team => {
        const matchIndex = team.matchHistory.findIndex(m => m.id === matchId);
        if (matchIndex !== -1) {
            const match = team.matchHistory[matchIndex];
            
            const isHome = match.home.id === team.id;
            const isAway = match.away.id === team.id;
            
            if (isHome) {
                revertTeamStats(team, match.home.score, match.away.score);
            } else if (isAway) {
                revertTeamStats(team, match.away.score, match.home.score);
            }
            
            team.matchHistory.splice(matchIndex, 1);
            matchFound = true;
        }
    });
    return matchFound;
}

function revertTeamStats(team, goalsFor, goalsAgainst) {
    team.pj -= 1;
    team.gm -= goalsFor;
    team.gc -= goalsAgainst;
    team.sg = team.gm - team.gc;
    
    if (goalsFor > goalsAgainst) {
        team.vit -= 1;
        team.pts -= 3;
    } else if (goalsFor === goalsAgainst) {
        team.e -= 1;
        team.pts -= 1;
    } else {
        team.der -= 1;
    }
}

function editMatch(matchId) {
    let matchToEdit = null;
    for (const team of clubs) {
        const match = team.matchHistory.find(m => m.id === matchId);
        if (match) {
            matchToEdit = match;
            break;
        }
    }
    
    if (!matchToEdit) return;
    
    editingMatchId = matchId;
    
    document.getElementById('match-date').value = matchToEdit.date;
    document.getElementById('match-round').value = matchToEdit.round || '';
    document.getElementById('match-complete').checked = matchToEdit.isComplete !== false;
    
    homeTeamSelect.value = matchToEdit.home.id;
    awayTeamSelect.value = matchToEdit.away.id;
    
    document.getElementById('home-score').value = matchToEdit.home.score;
    document.getElementById('home-possession').value = matchToEdit.home.possession || 50;
    document.getElementById('home-passes').value = matchToEdit.home.passes || 0;
    document.getElementById('home-corners').value = matchToEdit.home.corners || 0;
    document.getElementById('home-fouls').value = matchToEdit.home.fouls || 0;
    document.getElementById('home-offsides').value = matchToEdit.home.offsides || 0;
    document.getElementById('home-yellow').value = matchToEdit.home.yellowCards || 0;
    document.getElementById('home-red').value = matchToEdit.home.redCards || 0;
    document.getElementById('home-notes').value = matchToEdit.home.notes || '';
    
    document.getElementById('away-score').value = matchToEdit.away.score;
    document.getElementById('away-possession').value = matchToEdit.away.possession || 50;
    document.getElementById('away-passes').value = matchToEdit.away.passes || 0;
    document.getElementById('away-corners').value = matchToEdit.away.corners || 0;
    document.getElementById('away-fouls').value = matchToEdit.away.fouls || 0;
    document.getElementById('away-offsides').value = matchToEdit.away.offsides || 0;
    document.getElementById('away-yellow').value = matchToEdit.away.yellowCards || 0;
    document.getElementById('away-red').value = matchToEdit.away.redCards || 0;
    document.getElementById('away-notes').value = matchToEdit.away.notes || '';
    
    const submitBtn = document.querySelector('#add-match-form button[type="submit"]');
    submitBtn.textContent = 'Atualizar Partida';
    submitBtn.classList.remove('btn-secondary');
    submitBtn.classList.add('btn-warning');
    
    document.getElementById('add-match-form').scrollIntoView({ behavior: 'smooth' });
}

function deleteMatch(matchId) {
    if (confirm('Tem certeza que deseja excluir esta partida? Os pontos e saldo serão revertidos.')) {
        if (removeMatchStats(matchId)) {
            saveData();
            renderTable();
            renderMatches();
            alert('Partida excluída com sucesso!');
        }
    }
}

function renderMatches() {
    const matchesContainer = document.getElementById('matches-container');
    if (!matchesContainer) return;
    
    const allMatches = [];
    const seenMatchIds = new Set();
    
    clubs.filter(c => c.series === currentSeries).forEach(club => {
        if (club.matchHistory) {
            club.matchHistory.forEach(match => {
                if (!seenMatchIds.has(match.id)) {
                    seenMatchIds.add(match.id);
                    allMatches.push(match);
                }
            });
        }
    });
    
    if (allMatches.length === 0) {
        matchesContainer.innerHTML = '<div class="empty-state">Nenhuma partida registrada nesta série.</div>';
        return;
    }
    
    const groupedMatches = {};
    allMatches.forEach(match => {
        const round = match.round || 0;
        if (!groupedMatches[round]) groupedMatches[round] = [];
        groupedMatches[round].push(match);
    });
    
    const rounds = Object.keys(groupedMatches).map(Number).sort((a, b) => a - b);
    
    let html = '';
    rounds.forEach(round => {
        groupedMatches[round].sort((a, b) => new Date(a.date) - new Date(b.date));
        
        const roundLabel = round === 0 ? 'Sem Rodada Definida' : `Rodada ${round}`;
        
        html += `<div class="round-group">
            <h3 class="round-title">${roundLabel}</h3>
            <div class="matches-list">`;
            
        groupedMatches[round].forEach(match => {
            let dateStr = match.date;
            if (dateStr) {
                const parts = dateStr.split('-');
                if(parts.length === 3) {
                    dateStr = `${parts[2]}/${parts[1]}/${parts[0]}`;
                }
            }
            
            const incompleteClass = match.isComplete === false ? 'match-item-incomplete' : '';
            const incompleteWarning = match.isComplete === false ? '<div class="incomplete-warning">⚠️ Registro Incompleto</div>' : '';
            
            html += `
                <div class="match-item-wrapper ${incompleteClass}">
                    <div class="match-item glass-panel" onclick="toggleMatchDetails('${match.id}')">
                        <div class="match-info">
                            <span class="match-date">📅 ${dateStr}</span>
                            ${incompleteWarning}
                        </div>
                        <div class="match-scoreline">
                            <div class="team-side home-side">
                                <span class="team-name">${match.home.name}</span>
                                <span class="score-box">${match.home.score}</span>
                            </div>
                            <span class="vs-text">X</span>
                            <div class="team-side away-side">
                                <span class="score-box">${match.away.score}</span>
                                <span class="team-name">${match.away.name}</span>
                            </div>
                        </div>
                        <div class="match-actions" onclick="event.stopPropagation()">
                            <button class="btn-icon btn-edit" onclick="editMatch('${match.id}')" title="Editar Partida">✏️ Editar</button>
                            <button class="btn-icon btn-delete" onclick="deleteMatch('${match.id}')" title="Excluir Partida">🗑️ Excluir</button>
                        </div>
                    </div>
                    
                    <div class="match-details" id="details-${match.id}">
                        <div class="details-grid">
                            <div class="detail-col">
                                <h4>Estatísticas - ${match.home.name}</h4>
                                <div class="stat-row"><span class="stat-label">Posse de Bola</span> <span class="stat-val">${match.home.possession || 50}%</span></div>
                                <div class="stat-row"><span class="stat-label">Passes Certos</span> <span class="stat-val">${match.home.passes || 0}</span></div>
                                <div class="stat-row"><span class="stat-label">Escanteios</span> <span class="stat-val">${match.home.corners || 0}</span></div>
                                <div class="stat-row"><span class="stat-label">Faltas Cometidas</span> <span class="stat-val">${match.home.fouls || 0}</span></div>
                                <div class="stat-row"><span class="stat-label">Impedimentos</span> <span class="stat-val">${match.home.offsides || 0}</span></div>
                                <div class="stat-row"><span class="stat-label">Cartões Amarelos</span> <span class="stat-val">${match.home.yellowCards || 0}</span></div>
                                <div class="stat-row"><span class="stat-label">Cartões Vermelhos</span> <span class="stat-val">${match.home.redCards || 0}</span></div>
                                ${match.home.notes ? `<div class="stat-row" style="flex-direction: column;"><span class="stat-label">Anotações:</span> <span class="stat-val" style="margin-top: 0.5rem; font-weight: normal;">${match.home.notes}</span></div>` : ''}
                            </div>
                            <div class="detail-col">
                                <h4>Estatísticas - ${match.away.name}</h4>
                                <div class="stat-row"><span class="stat-label">Posse de Bola</span> <span class="stat-val">${match.away.possession || 50}%</span></div>
                                <div class="stat-row"><span class="stat-label">Passes Certos</span> <span class="stat-val">${match.away.passes || 0}</span></div>
                                <div class="stat-row"><span class="stat-label">Escanteios</span> <span class="stat-val">${match.away.corners || 0}</span></div>
                                <div class="stat-row"><span class="stat-label">Faltas Cometidas</span> <span class="stat-val">${match.away.fouls || 0}</span></div>
                                <div class="stat-row"><span class="stat-label">Impedimentos</span> <span class="stat-val">${match.away.offsides || 0}</span></div>
                                <div class="stat-row"><span class="stat-label">Cartões Amarelos</span> <span class="stat-val">${match.away.yellowCards || 0}</span></div>
                                <div class="stat-row"><span class="stat-label">Cartões Vermelhos</span> <span class="stat-val">${match.away.redCards || 0}</span></div>
                                ${match.away.notes ? `<div class="stat-row" style="flex-direction: column;"><span class="stat-label">Anotações:</span> <span class="stat-val" style="margin-top: 0.5rem; font-weight: normal;">${match.away.notes}</span></div>` : ''}
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });
        
        html += `</div></div>`;
    });
    
    matchesContainer.innerHTML = html;
}

function toggleMatchDetails(matchId) {
    const detailsDiv = document.getElementById(`details-${matchId}`);
    if (detailsDiv) {
        detailsDiv.classList.toggle('expanded');
    }
}

// Render the Table
function renderTable() {
    const seriesClubs = clubs.filter(c => c.series === currentSeries);
    
    // Sort Logic: Pts > SG > GM > Name
    seriesClubs.sort((a, b) => {
        if (b.pts !== a.pts) return b.pts - a.pts;
        if (b.sg !== a.sg) return b.sg - a.sg;
        if (b.gm !== a.gm) return b.gm - a.gm;
        return a.name.localeCompare(b.name);
    });
    
    if (seriesClubs.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="10" class="empty-state">Nenhum clube cadastrado na Série ${currentSeries}.<br>Adicione clubes no formulário.</td></tr>`;
        return;
    }
    
    let html = '';
    
    seriesClubs.forEach((club, index) => {
        const position = index + 1;
        let rowClass = '';
        
        // Exact Zones Logic
        if (currentSeries === 'A') {
            if (position >= 1 && position <= 4) rowClass = 'liberta-zone';
            else if (position === 5) rowClass = 'pre-liberta-zone';
            else if (position >= 6 && position <= 11) rowClass = 'sula-zone';
            else if (position >= 17 && position <= 20) rowClass = 'relegation-zone';
        } else if (currentSeries === 'B') {
            if (position >= 1 && position <= 4) rowClass = 'promo-zone';
            else if (position >= 17 && position <= 20) rowClass = 'relegation-zone';
        }
        
        html += `
            <tr class="${rowClass} table-row-clickable" onclick="openClubProfile('${club.id}')">
                <td class="col-pos">${position}</td>
                <td class="col-club">
                    <div style="width: 24px; height: 24px; background: rgba(255,255,255,0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.7rem;">⚽</div>
                    ${club.name}
                </td>
                <td class="col-pts">${club.pts}</td>
                <td>${club.pj}</td>
                <td>${club.vit}</td>
                <td>${club.e}</td>
                <td>${club.der}</td>
                <td>${club.gm}</td>
                <td>${club.gc}</td>
                <td>${club.sg}</td>
            </tr>
        `;
    });
    
    tableBody.innerHTML = html;
}

// Export Data
function exportData() {
    if (clubs.length === 0) {
        alert('Não há dados para exportar.');
        return;
    }
    
    // Map data to handle "Série B pause" requirement on export
    // The requirement: "Quando o time vai para a Série B o acompanhamento é pausado até voltar para a série a"
    // We will inject a warning or flag if the club is currently in Serie B.
    const exportPayload = clubs.map(c => {
        if (c.series === 'B') {
            return {
                ...c,
                status_acompanhamento: "PAUSADO (Clube na Série B)"
            };
        } else {
            return {
                ...c,
                status_acompanhamento: "ATIVO"
            };
        }
    });

    const dataStr = JSON.stringify(exportPayload, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `brasileirao_dados_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Data Persistence (Import/Export)
function importData(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            if (Array.isArray(data)) {
                // simple validation
                if (data.length > 0 && data[0].name !== undefined) {
                    clubs = data;
                    // ensure all clubs have a roster
                    clubs.forEach(c => {
                        if (!c.roster) c.roster = [];
                    });
                    saveData();
                    renderTable();
                    renderMatches();
                    updateSelectors();
                    alert('Dados importados com sucesso!');
                } else {
                    alert('Arquivo JSON inválido.');
                }
            } else {
                alert('Arquivo JSON com formato não suportado.');
            }
        } catch(err) {
            alert('Erro ao ler o arquivo JSON.');
        }
        // reset input
        event.target.value = '';
    };
    reader.readAsText(file);
}

// Club Profile Modal Functions
let activeClubProfileId = null;

function openClubProfile(clubId) {
    const club = clubs.find(c => c.id === clubId);
    if (!club) return;
    
    activeClubProfileId = clubId;
    
    document.getElementById('modal-club-name').innerText = club.name;
    document.getElementById('modal-club-series').innerText = 'Série ' + club.series;
    
    const transferBtn = document.getElementById('btn-transfer-series');
    if (club.series === 'A') {
        transferBtn.innerText = '⬇️ Rebaixar para Série B';
        transferBtn.className = 'btn-transfer btn-relegate';
    } else {
        transferBtn.innerText = '⬆️ Promover para Série A';
        transferBtn.className = 'btn-transfer btn-promote';
    }
    
    calculateClubStats(club);
    renderRoster(club);
    
    document.getElementById('club-modal').style.display = 'flex';
}

function closeClubProfile() {
    document.getElementById('club-modal').style.display = 'none';
    activeClubProfileId = null;
}

function switchModalTab(tabId) {
    document.getElementById('modal-btn-estatisticas').classList.remove('active');
    document.getElementById('modal-btn-elenco').classList.remove('active');
    document.getElementById('modal-btn-' + tabId).classList.add('active');
    
    document.getElementById('modal-tab-estatisticas').classList.remove('active');
    document.getElementById('modal-tab-elenco').classList.remove('active');
    document.getElementById('modal-tab-estatisticas').style.display = 'none';
    document.getElementById('modal-tab-elenco').style.display = 'none';
    
    document.getElementById('modal-tab-' + tabId).style.display = 'block';
    setTimeout(() => {
        document.getElementById('modal-tab-' + tabId).classList.add('active');
    }, 10);
}

function calculateClubStats(club) {
    let totalCorners = 0;
    let totalFouls = 0;
    let totalPasses = 0;
    let totalPossession = 0;
    let matchCount = club.matchHistory ? club.matchHistory.length : 0;
    
    if (matchCount > 0) {
        club.matchHistory.forEach(match => {
            const isHome = match.home.id === club.id;
            const stats = isHome ? match.home : match.away;
            
            totalCorners += (stats.corners || 0);
            totalFouls += (stats.fouls || 0);
            totalPasses += (stats.passes || 0);
            totalPossession += (stats.possession || 50);
        });
        
        document.getElementById('stat-avg-corners').innerText = (totalCorners / matchCount).toFixed(1);
        document.getElementById('stat-avg-fouls').innerText = (totalFouls / matchCount).toFixed(1);
        document.getElementById('stat-avg-passes').innerText = Math.round(totalPasses / matchCount);
        document.getElementById('stat-avg-possession').innerText = Math.round(totalPossession / matchCount) + '%';
    } else {
        document.getElementById('stat-avg-corners').innerText = '0.0';
        document.getElementById('stat-avg-fouls').innerText = '0.0';
        document.getElementById('stat-avg-passes').innerText = '0';
        document.getElementById('stat-avg-possession').innerText = '0%';
    }
    
    // Winrate
    const winrate = club.pj > 0 ? (club.vit / club.pj) * 100 : 0;
    document.getElementById('stat-winrate').innerText = Math.round(winrate) + '%';
    document.getElementById('winrate-fill').style.width = winrate + '%';
    
    // Chance de Série B (Heuristic)
    let relegationRisk = 0;
    if (club.series === 'A') {
        const gamesLeft = 38 - club.pj;
        const maxPossiblePoints = club.pts + (gamesLeft * 3);
        
        if (club.pts >= 45) {
            relegationRisk = 0;
        } else if (maxPossiblePoints < 45) {
            relegationRisk = 100;
        } else {
            let risk = ((45 - club.pts) / 45) * 100;
            if (gamesLeft < 19) {
                risk = risk * (1 + ((19 - gamesLeft) * 0.05));
            }
            relegationRisk = Math.min(99, Math.max(1, risk));
        }
        
        if (club.pj === 0) relegationRisk = 0;
    } else if (club.series === 'B') {
        // Para a série B a lógica de rebaixamento para série C é similar
        const gamesLeft = 38 - club.pj;
        const maxPossiblePoints = club.pts + (gamesLeft * 3);
        if (club.pts >= 45) {
            relegationRisk = 0;
        } else if (maxPossiblePoints < 45) {
            relegationRisk = 100;
        } else {
            let risk = ((45 - club.pts) / 45) * 100;
            relegationRisk = Math.min(99, Math.max(1, risk));
        }
        if (club.pj === 0) relegationRisk = 0;
    }
    
    document.getElementById('stat-relegation-chance').innerText = Math.round(relegationRisk) + '%';
    document.getElementById('risk-fill').style.width = relegationRisk + '%';
}

function addPlayerToClub() {
    if (!activeClubProfileId) return;
    const nameInput = document.getElementById('new-player-name');
    const posInput = document.getElementById('new-player-position');
    
    const name = nameInput.value.trim();
    const pos = posInput.value.trim();
    
    if (!name) return;
    
    const club = clubs.find(c => c.id === activeClubProfileId);
    if (club) {
        if (!club.roster) club.roster = [];
        club.roster.push({
            id: Date.now().toString(),
            name: name,
            position: pos || 'Sem Pos.'
        });
        saveData();
        renderRoster(club);
        nameInput.value = '';
        posInput.value = '';
    }
}

function removePlayer(playerId) {
    if (!activeClubProfileId) return;
    const club = clubs.find(c => c.id === activeClubProfileId);
    if (club && club.roster) {
        club.roster = club.roster.filter(p => p.id !== playerId);
        saveData();
        renderRoster(club);
    }
}

function renderRoster(club) {
    const rosterList = document.getElementById('roster-list');
    if (!club.roster || club.roster.length === 0) {
        rosterList.innerHTML = '<tr><td colspan="3" class="empty-state">Nenhum jogador registrado no elenco.</td></tr>';
        return;
    }
    
    let html = '';
    club.roster.forEach(player => {
        html += `
            <tr>
                <td><strong>${player.name}</strong></td>
                <td><span style="background: rgba(255,255,255,0.1); padding: 0.2rem 0.5rem; border-radius: 4px; font-size: 0.8rem;">${player.position}</span></td>
                <td>
                    <button class="btn-icon btn-delete" onclick="removePlayer('${player.id}')" title="Remover Jogador" style="padding: 0.2rem 0.5rem; font-size: 0.8rem;">Excluir</button>
                </td>
            </tr>
        `;
    });
    rosterList.innerHTML = html;
}

function transferClubSeries() {
    if (!activeClubProfileId) return;
    const club = clubs.find(c => c.id === activeClubProfileId);
    if (!club) return;
    
    const targetSeries = club.series === 'A' ? 'B' : 'A';
    const actionName = club.series === 'A' ? 'rebaixar' : 'promover';
    
    const confirmMessage = `Tem certeza que deseja ${actionName} o ${club.name} para a Série ${targetSeries}?\n\nATENÇÃO: Isso iniciará uma nova temporada para o clube, ZERANDO seus pontos, saldo de gols e histórico de partidas atuais!`;
    
    if (confirm(confirmMessage)) {
        club.series = targetSeries;
        
        club.pj = 0;
        club.vit = 0;
        club.e = 0;
        club.der = 0;
        club.gm = 0;
        club.gc = 0;
        club.sg = 0;
        club.pts = 0;
        club.matchHistory = []; 
        
        saveData();
        closeClubProfile();
        setSeries(targetSeries);
        
        alert(`O ${club.name} foi transferido para a Série ${targetSeries} e suas estatísticas foram zeradas para a nova temporada.`);
    }
}

// Start
document.addEventListener('DOMContentLoaded', init);
