:root {
    --primary: #4F46E5;
    --primary-hover: #4338CA;
    --bg-color: #F3F4F6;
    --card-bg: #FFFFFF;
    --text-main: #111827;
    --text-muted: #6B7280;
    --danger: #EF4444;
    --danger-hover: #DC2626;
    --success: #10B981;
    --warning: #F59E0B;
    --border-color: #E5E7EB;
    --input-bg: #FFFFFF;
    --input-border: #D1D5DB;
    --section-bg: #F9FAFB;
    --header-bg: linear-gradient(135deg, var(--primary), #818CF8);
    --footer-bg: rgba(255, 255, 255, 0.95);
    --budget-input-bg: rgba(255, 255, 255, 0.95);
    --budget-input-color: #111827;
    --delete-bg: #FEE2E2;
    --border-radius: 20px;
    --shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    --transition: all 0.2s ease;
}

[data-theme="dark"] {
    --primary: #6366F1;
    --primary-hover: #4F46E5;
    --bg-color: #030712;
    --card-bg: #111827;
    --text-main: #F9FAFB;
    --text-muted: #9CA3AF;
    --danger: #F87171;
    --danger-hover: #EF4444;
    --success: #34D399;
    --warning: #FBBF24;
    --border-color: #374151;
    --input-bg: #1F2937;
    --input-border: #4B5563;
    --section-bg: #030712;
    --header-bg: linear-gradient(135deg, #312E81, #4338CA);
    --footer-bg: rgba(17, 24, 39, 0.95);
    --budget-input-bg: rgba(0, 0, 0, 0.2);
    --budget-input-color: #F9FAFB;
    --delete-bg: #374151;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Inter', sans-serif;
    background-color: var(--bg-color);
    color: var(--text-main);
    display: flex;
    justify-content: center;
    align-items: flex-start;
    min-height: 100vh;
    padding: 20px;
    transition: background-color 0.3s ease, color 0.3s ease;
}

.app-container {
    background-color: var(--card-bg);
    width: 100%;
    max-width: 420px;
    min-height: 90vh;
    border-radius: var(--border-radius);
    box-shadow: var(--shadow);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    position: relative;
    padding-bottom: 80px; 
    transition: background-color 0.3s ease;
}

header {
    background: var(--header-bg);
    color: white;
    padding: 24px;
    border-bottom-left-radius: 24px;
    border-bottom-right-radius: 24px;
    margin-bottom: 20px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.header-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.header-top h1 {
    font-size: 1.4rem;
    font-weight: 700;
}

.header-actions {
    display: flex;
    gap: 8px;
}

.action-btn {
    background: rgba(255, 255, 255, 0.2);
    border: none;
    border-radius: 10px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-weight: 600;
    transition: var(--transition);
    color: white;
    padding: 0 12px;
}
.action-btn.theme-toggle {
    width: 40px;
    padding: 0;
    border-radius: 50%;
    font-size: 1.2rem;
}
.action-btn:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.05);
}

.tabs-nav {
    display: flex;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 12px;
    padding: 4px;
    margin-bottom: 16px;
}

.tab-btn {
    flex: 1;
    background: transparent;
    color: white;
    border: none;
    padding: 10px;
    border-radius: 10px;
    font-size: 0.95rem;
    font-weight: 600;
    cursor: pointer;
    transition: var(--transition);
    opacity: 0.8;
}

.tab-btn.active {
    background: white;
    color: var(--primary);
    opacity: 1;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

[data-theme="dark"] .tab-btn.active {
    background: var(--card-bg);
    color: var(--primary);
}

.views-container {
    flex: 1;
    overflow-y: auto;
}

.tab-content {
    display: none;
    width: 100%;
}

.tab-content.active {
    display: block;
    animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(5px); }
    to { opacity: 1; transform: translateY(0); }
}

/* Rest of structure... */
.budget-section label { font-size: 0.875rem; font-weight: 500; opacity: 0.9; }
.budget-section input[type="number"] {
    width: 100%; padding: 12px; border: none; border-radius: 12px; margin-top: 8px;
    font-size: 1rem; font-weight: 600; color: var(--budget-input-color);
    background: var(--budget-input-bg); transition: var(--transition);
}
.budget-section input[type="number"]:focus { outline: none; box-shadow: 0 0 0 3px rgba(255,255,255,0.4); }

.budget-group-container { display: flex; flex-direction: column; gap: 4px; }
.budget-wrapper, .group-mode-wrapper { display: flex; flex-direction: column; }
.group-mode-wrapper { background: rgba(255, 255, 255, 0.15); padding: 10px 14px; border-radius: 12px; margin-top: 8px; }
.group-toggle-label { display: flex; align-items: center; gap: 8px; font-weight: 600; cursor: pointer; font-size: 0.95rem; margin-bottom: 0; color: white; }
.group-toggle-label input[type="checkbox"] { width: 18px; height: 18px; margin: 0; accent-color: var(--primary); cursor: pointer; }
#global-divisor-container { margin-top: 10px; display: flex; align-items: center; gap: 8px; border-top: 1px solid rgba(255,255,255,0.2); padding-top: 10px; }
#global-divisor-container label { font-size: 0.85rem; font-weight: 600; }
#global-divisor-container input[type="number"] { width: 70px; padding: 8px; margin-top: 0; text-align: center; border-radius: 8px; }
.progress-bar-container { height: 6px; background: rgba(255, 255, 255, 0.3); border-radius: 4px; margin-top: 12px; overflow: hidden; }
.progress-bar { height: 100%; width: 0%; background-color: var(--success); transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.4s ease; }

#tab-calculator { padding: 0 20px; }
#tab-recipes { padding: 0 20px 20px 20px; }

.add-item-section {
    background: var(--section-bg); padding: 16px; border-radius: 16px; margin-bottom: 24px;
    border: 1px solid var(--border-color); transition: background-color 0.3s ease, border-color 0.3s ease;
}

.label-with-action {
    display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;
}

.scan-btn {
    background: none; border: 1px solid var(--primary); color: var(--primary);
    border-radius: 6px; padding: 4px 8px; font-size: 0.75rem; font-weight: 600; cursor: pointer; transition: var(--transition);
}
.scan-btn:hover { background: var(--primary); color: white; }
.scan-btn.cancel-scan { border-color: var(--danger); color: var(--danger); margin-top: 10px; width: 100%; padding: 8px; }

#reader-container { margin-bottom: 10px; padding: 10px; background: white; border-radius: 10px; border: 1px solid var(--border-color); }
#reader { width: 100%; border-radius: 8px; overflow: hidden; }

.form-row { display: flex; gap: 12px; margin-bottom: 12px; align-items: flex-end; }
.form-row:last-child { margin-bottom: 0; }
.form-group { display: flex; flex-direction: column; min-width: 0; }
.flex-1 { flex: 1; } .flex-2 { flex: 2; width: 100%; }
.form-group label { font-size: 0.75rem; font-weight: 600; color: var(--text-muted); margin-bottom: 0; text-transform: uppercase; letter-spacing: 0.05em; }
.form-group input { width: 100%; padding: 12px; border: 1px solid var(--input-border); border-radius: 10px; font-size: 1rem; transition: var(--transition); background: var(--input-bg); color: var(--text-main); }
.form-group input:focus { outline: none; border-color: var(--primary); box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.15); }
.btn-add { background-color: var(--primary); color: white; border: none; border-radius: 10px; width: 46px; height: 46px; font-size: 1.5rem; font-weight: bold; cursor: pointer; transition: var(--transition); display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 4px rgba(79, 70, 229, 0.3); }
.btn-add:hover { background-color: var(--primary-hover); transform: translateY(-2px); box-shadow: 0 4px 6px rgba(79, 70, 229, 0.4); }
.btn-add:active { transform: translateY(0); }

.items-list-section { padding-bottom: 20px; }
#items-list { list-style: none; }
.list-item { display: flex; align-items: center; justify-content: space-between; padding: 16px; background: var(--card-bg); border: 1px solid var(--border-color); border-radius: 14px; margin-bottom: 12px; transition: var(--transition); animation: slideIn 0.3s ease forwards; position: relative; }
@keyframes slideIn { from { opacity: 0; transform: translateY(15px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
.item-info { flex: 1; }
.item-name { font-weight: 600; font-size: 1.05rem; margin-bottom: 4px; color: var(--text-main); }
.item-details { font-size: 0.875rem; color: var(--text-muted); font-weight: 500; display: flex; align-items: center; gap: 8px; }
.price-badge { font-size: 0.75rem; padding: 2px 6px; border-radius: 4px; font-weight: 700; }
.price-badge.cheaper { background: rgba(16, 185, 129, 0.1); color: var(--success); }
.price-badge.expensive { background: rgba(239, 68, 68, 0.1); color: var(--danger); }
.price-badge.equal { background: rgba(107, 114, 128, 0.1); color: var(--text-muted); }
.item-total { font-weight: 700; font-size: 1.15rem; margin-right: 16px; color: var(--text-main); text-align: right; }
.item-total-share { display: block; font-size: 0.85rem; color: var(--primary); font-weight: 600; margin-top: 2px; }
.btn-delete { background: var(--delete-bg); border: none; color: var(--danger); cursor: pointer; padding: 10px; border-radius: 10px; transition: var(--transition); display: flex; align-items: center; justify-content: center; }
.btn-delete:hover { color: white; background-color: var(--danger); }

/* Item Divisor (Group Mode) */
.item-divisor-wrapper { display: flex; align-items: center; gap: 6px; margin-top: 8px; background: var(--bg-color); padding: 4px 8px; border-radius: 8px; width: fit-content; border: 1px solid var(--border-color); }
.item-divisor-wrapper label { font-size: 0.75rem; color: var(--text-muted); font-weight: 600; margin: 0; text-transform: none; }
.item-divisor-wrapper input { width: 50px; padding: 4px; border: 1px solid var(--input-border); border-radius: 6px; background: var(--input-bg); color: var(--text-main); font-size: 0.85rem; text-align: center; margin: 0; }
.item-divisor-wrapper input:focus { outline: none; border-color: var(--primary); }

footer { position: absolute; bottom: 0; left: 0; width: 100%; background: var(--footer-bg); backdrop-filter: blur(10px); padding: 20px 24px; border-top: 1px solid var(--border-color); box-shadow: 0 -4px 10px -1px rgba(0, 0, 0, 0.05); transition: background-color 0.3s ease, border-color 0.3s ease; }
.summary { display: flex; justify-content: space-between; align-items: center; }
.summary-item { color: var(--text-muted); font-size: 1rem; }
.summary-item strong { color: var(--text-main); font-size: 1.1rem; margin-left: 4px; }
.summary-totals { display: flex; flex-direction: column; align-items: flex-end; gap: 4px; }
.summary-total { display: flex; align-items: center; justify-content: space-between; gap: 8px; width: 100%; }
.summary-total span:first-child { font-weight: 600; color: var(--text-muted); text-align: right; }
.summary-total span:last-child { font-size: 1.5rem; font-weight: 800; color: var(--text-main); transition: color 0.3s ease; text-align: right; min-width: 100px; }
#my-share-container span:last-child { color: var(--primary); font-size: 1.75rem; }
.summary-total span:last-child.over-budget { color: var(--danger) !important; }

/* IA / Recipes */
.recipes-header { margin-bottom: 24px; text-align: center; }
.recipes-header h2 { font-size: 1.25rem; color: var(--text-main); margin-bottom: 4px; }
.recipes-header p { color: var(--text-muted); font-size: 0.9rem; }
.ai-connect-section { margin-bottom: 20px; text-align: center; }
.ai-btn { width: 100%; padding: 14px; background: linear-gradient(135deg, #10B981, #059669); color: white; border: none; border-radius: 12px; font-weight: 700; font-size: 1rem; cursor: pointer; box-shadow: 0 4px 6px rgba(16, 185, 129, 0.3); transition: var(--transition); }
.ai-btn:hover { transform: translateY(-2px); box-shadow: 0 6px 8px rgba(16, 185, 129, 0.4); }
.ai-btn-outline { width: 100%; padding: 12px; margin-top: 10px; background: transparent; color: var(--primary); border: 1px solid var(--primary); border-radius: 12px; font-weight: 600; font-size: 0.9rem; cursor: pointer; transition: var(--transition); }
.ai-btn-outline:hover { background: rgba(79, 70, 229, 0.1); }
.ai-help-content { background: var(--section-bg); border: 1px solid var(--border-color); border-radius: 12px; padding: 16px; margin-top: 10px; text-align: left; font-size: 0.85rem; color: var(--text-main); line-height: 1.5; }
.ai-help-content ol { padding-left: 20px; margin-bottom: 12px; }
.ai-help-content li { margin-bottom: 8px; }
.ai-help-content a { color: var(--primary); font-weight: 600; text-decoration: none; }
.ai-help-content a:hover { text-decoration: underline; }
.ai-help-content code { background: rgba(0,0,0,0.1); padding: 2px 4px; border-radius: 4px; font-family: monospace; }
[data-theme="dark"] .ai-help-content code { background: rgba(255,255,255,0.1); }
.obs-text { color: var(--danger); font-weight: 700; margin-top: 10px; }
.ai-btn.generate { background: linear-gradient(135deg, #8B5CF6, #6D28D9); box-shadow: 0 4px 6px rgba(139, 92, 246, 0.3); margin-top: 10px; }
.ai-status { margin-top: 10px; font-size: 0.85rem; color: var(--text-muted); }

.recipe-card { background: var(--card-bg); border: 1px solid var(--border-color); border-radius: 16px; padding: 20px; margin-bottom: 16px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); white-space: pre-line; color: var(--text-main); line-height: 1.5; }
.recipe-card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
.recipe-title { font-weight: 700; font-size: 1.1rem; color: var(--text-main); }

/* Modal */
.modal { position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 1000; display: flex; align-items: center; justify-content: center; }
.modal-overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.5); backdrop-filter: blur(4px); }
.modal-content { position: relative; background: var(--card-bg); width: 90%; max-width: 400px; padding: 24px; border-radius: 20px; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1); border: 1px solid var(--border-color); }
.modal-content h3 { font-size: 1.25rem; margin-bottom: 12px; color: var(--text-main); }
.modal-content p { font-size: 0.9rem; color: var(--text-muted); margin-bottom: 20px; line-height: 1.5; }
.modal-content input { width: 100%; padding: 12px; border: 1px solid var(--input-border); border-radius: 10px; margin-bottom: 20px; background: var(--input-bg); color: var(--text-main); font-size: 1rem; }
.modal-actions { display: flex; gap: 12px; justify-content: flex-end; }
.btn-primary { padding: 10px 16px; background: var(--primary); color: white; border: none; border-radius: 8px; font-weight: 600; cursor: pointer; }
.btn-cancel { padding: 10px 16px; background: transparent; color: var(--text-muted); border: 1px solid var(--border-color); border-radius: 8px; font-weight: 600; cursor: pointer; }

/* PDF Export styles */
.pdf-export-container { padding: 20px; font-family: 'Inter', sans-serif; background: white; color: black; }
.pdf-header { text-align: center; margin-bottom: 20px; border-bottom: 2px solid #E5E7EB; padding-bottom: 10px; }
.pdf-header h1 { font-size: 1.5rem; color: #111827; }
.pdf-header p { color: #6B7280; font-size: 0.9rem; }
.pdf-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
.pdf-table th, .pdf-table td { border-bottom: 1px solid #E5E7EB; padding: 10px 8px; text-align: left; font-size: 0.9rem; }
.pdf-table th { font-weight: 700; color: #374151; background-color: #F9FAFB; }
.pdf-table td.number { text-align: right; }
.pdf-totals { width: 100%; margin-top: 20px; text-align: right; font-size: 1rem; }
.pdf-totals p { margin: 6px 0; }
.pdf-totals .highlight { font-size: 1.25rem; font-weight: bold; color: #4F46E5; }

/* Responsive */
@media (min-width: 768px) {
    body { padding: 40px; align-items: center; }
    .app-container { max-width: 900px; min-height: auto; padding-bottom: 0; }
    header { border-radius: 24px 24px 0 0; margin-bottom: 0; }
    .views-container { width: 100%; }
    #tab-calculator.active { display: flex; gap: 24px; padding: 24px; align-items: flex-start; }
    #tab-recipes.active { display: block; padding: 24px; max-height: 600px; overflow-y: auto; }
    .add-item-section { flex: 1; margin-bottom: 0; position: sticky; top: 24px; }
    .items-list-section { flex: 1.5; padding-bottom: 0; max-height: 500px; overflow-y: auto; padding-right: 8px; }
    .items-list-section::-webkit-scrollbar, #tab-recipes.active::-webkit-scrollbar { width: 6px; }
    .items-list-section::-webkit-scrollbar-track, #tab-recipes.active::-webkit-scrollbar-track { background: transparent; }
    .items-list-section::-webkit-scrollbar-thumb, #tab-recipes.active::-webkit-scrollbar-thumb { background-color: var(--border-color); border-radius: 20px; }
    footer { position: static; border-radius: 0 0 24px 24px; box-shadow: none; padding: 24px; }
}
