// ===================== DATA =====================
const ACCENT_COLORS = [
  { name: 'Verde bosque', accent: '#2D5A3D', accent2: '#3D7A54', light: '#E8F2EC', mid: '#A8CDB5' },
  { name: 'Azul marino', accent: '#1A4A7A', accent2: '#2560A0', light: '#E6F0FA', mid: '#A0C0E8' },
  { name: 'Terracota', accent: '#8B4A2E', accent2: '#A85A38', light: '#F5EAE4', mid: '#D8B0A0' },
  { name: 'Púrpura', accent: '#5A2D8A', accent2: '#7040A8', light: '#F0EAF8', mid: '#C0A0E0' },
  { name: 'Ocre', accent: '#7A5520', accent2: '#9A6A28', light: '#F5EEE0', mid: '#D8C090' },
  { name: 'Rojo oscuro', accent: '#8B2E2E', accent2: '#A84040', light: '#F5E8E8', mid: '#D8A8A8' },
];

// Fuente única de categorías: pills, select del modal y colores salen de aquí.
// Para renombrar una categoría, cámbiala SOLO en este arreglo (y en LEGACY_CAT_MAP si quieres migrar datos viejos).
const CATEGORIES = [
  'Financial Management',
  'Procesos de Operaciones',
  'Capacity Partnering',
];

const CAT_CLASSES = {
  'Financial Management': 'cat-fin',
  'Procesos de Operaciones': 'cat-ops',
  'Capacity Partnering': 'cat-glow',
};

// Categorías antiguas -> categorías actuales (para tareas ya guardadas en el navegador)
const LEGACY_CAT_MAP = {
  'End-to-End Controlling': 'Procesos de Operaciones',
  'Glow': 'Capacity Partnering',
  'Comunicación': 'Capacity Partnering',
  'Finanzas': 'Financial Management',
  'Admin': 'Financial Management',
  'Operaciones': 'Procesos de Operaciones',
  'Documentación': 'Procesos de Operaciones',
};

function normalizeCat(cat) {
  if (CATEGORIES.includes(cat)) return cat;
  return LEGACY_CAT_MAP[cat] || CATEGORIES[0];
}

let tasks = [];
let currentFilter = 'all';
let currentSearch = '';
let editingId = null;

// ===================== INITIAL DATA =====================
const INITIAL_TASKS = [
  {
    id: 1,
    name: 'Creación de Staff Request (SR)',
    desc: 'Generación de solicitudes de personal bajo demanda en la plataforma Glow.',
    time: '5 a 10 minutos',
    cat: 'Glow',
    flow: [
      'Ir a Glow',
      'Click en Staffing',
      'Click en Staff Request',
      'Click en Create New Staff Request',
      'En el botón nuevo staff request seleccionar la opción correcta',
      'Editar posición, seniority, fecha inicio y final, añadir skills, tipo de lenguaje, la primera locación, seleccionar si tiene relocalización o no, seleccionar si requiere viajar o no',
      'Editar nombre cliente, nombre posición, nombre del proyecto y descripción',
      'Click en Next para finalizar',
    ]
  },
  {
    id: 2,
    name: 'Auditoría de SR activos',
    desc: 'Revisión técnica de las solicitudes de staff abiertas actualmente.',
    time: 'Variable (según volumen de SR)',
    cat: 'Glow',
    flow: [
      'Ir a Glow',
      'Click en Staffing',
      'Click en Staff Request',
      'Click en My Staff Request',
      'Visualizar el número del ticket propio',
      'Verificar que esté activo aún',
      'Seleccionar el ticket',
      'Verificar cuántos plans tiene',
      'Si el ticket tiene más de 3 plans, cerrar alguno calificando los perfiles (Fit o No Fit)',
    ]
  },
  {
    id: 3,
    name: 'Calificación de perfiles (Fit/No Fit)',
    desc: 'Evaluación de candidatos en la plataforma Glow y asignación de estatus.',
    time: '3 minutos por candidato',
    cat: 'Glow',
    flow: ['Ir a Glow']
  },
  {
    id: 4,
    name: 'Depuración de SR',
    desc: 'Limpieza y cierre de Staff Requests por excedente de planes o duplicidad.',
    time: '5 minutos por SR',
    cat: 'Glow',
    flow: []
  },
  {
    id: 5,
    name: 'Estructuración de archivos de seguimiento',
    desc: 'Creación de Google Sheets específicos para el control de nuevas posiciones.',
    time: '30 minutos',
    cat: 'Documentación',
    flow: []
  },
  {
    id: 6,
    name: 'Actualización de base de datos para nuevas posiciones',
    desc: 'Alimentación diaria del archivo de seguimiento con nuevos candidatos y estados.',
    time: '1 hora (sujeto a volumen)',
    cat: 'Documentación',
    flow: []
  },
  {
    id: 7,
    name: 'Gestión de logística de entrevistas',
    desc: 'Programación y configuración de sesiones en Google Meet.',
    time: '5 minutos',
    cat: 'Operaciones',
    flow: []
  },
  {
    id: 8,
    name: 'Gestión de comunicaciones',
    desc: 'Resolución de dudas y seguimiento a candidatos vía Slack.',
    time: '30 minutos (según flujo)',
    cat: 'Comunicación',
    flow: []
  },
  {
    id: 9,
    name: 'Modificación de tarifas en Glow',
    desc: 'Modificación de rates para candidatos dentro de la plataforma Glow.',
    time: '5 minutos',
    cat: 'Glow',
    flow: []
  },
  {
    id: 10,
    name: 'Centralización documental de facturas de hoteles',
    desc: 'Carga de facturación mensual en Drive y registro en Google Sheets.',
    time: '1 hora',
    cat: 'Documentación',
    flow: []
  },
  {
    id: 11,
    name: 'Gestión de jornadas laborales',
    desc: 'Modificación de working hours para personal de hoteles bajo demanda.',
    time: '30 minutos por persona',
    cat: 'Admin',
    flow: []
  },
  {
    id: 12,
    name: 'Migración de estructuras',
    desc: 'Reubicación de proyectos nuevos al segmento correspondiente en Glow.',
    time: '5 minutos',
    cat: 'Glow',
    flow: []
  },
  {
    id: 13,
    name: 'Actualización financiera (Hoteles)',
    desc: 'Ejecución de procesos financieros para el segmento de hoteles.',
    time: '3 h (normal) a 6 h (con errores de script)',
    cat: 'Finanzas',
    flow: []
  },
  {
    id: 14,
    name: 'Actualización de Forecast',
    desc: 'Registro de nuevos ingresos en el modelo de proyecciones.',
    time: '30 minutos',
    cat: 'Finanzas',
    flow: []
  },
  {
    id: 15,
    name: 'Gestión en Sysphera',
    desc: 'Proceso de actualización y sincronización en la plataforma Sysphera.',
    time: '2 horas',
    cat: 'Operaciones',
    flow: []
  },
  {
    id: 16,
    name: 'Monitoreo de cobranza',
    desc: 'Revisión del estado actual de las facturas emitidas.',
    time: '1 hora',
    cat: 'Finanzas',
    flow: []
  },
  {
    id: 17,
    name: 'Gestión de incidencias',
    desc: 'Creación de tickets de soporte en plataformas Atlassian.',
    time: '30 minutos',
    cat: 'Operaciones',
    flow: []
  },
  {
    id: 18,
    name: 'Ejecución de Releases',
    desc: 'Gestión y seguimiento del proceso de liberaciones.',
    time: '1 hora',
    cat: 'Operaciones',
    flow: []
  },
  {
    id: 19,
    name: 'Cierre administrativo mensual',
    desc: 'Proceso integral de facturación al finalizar el ciclo de mes.',
    time: 'Entre 4 y 7 horas',
    cat: 'Admin',
    flow: []
  },
];

// ===================== STORAGE =====================
function loadTasks() {
  const stored = localStorage.getItem('mapa-tareas-v2');
  tasks = stored ? JSON.parse(stored) : INITIAL_TASKS.map(t => ({ ...t }));
  // Corrige categorías que ya no existen para que el filtro las encuentre
  tasks = tasks.map(t => ({ ...t, cat: normalizeCat(t.cat) }));
  saveTasks();
}

function saveTasks() {
  localStorage.setItem('mapa-tareas-v2', JSON.stringify(tasks));
}

function nextId() {
  return tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
}

// ===================== RENDER =====================
function getFilteredTasks() {
  return tasks.filter(t => {
    const matchSearch = !currentSearch ||
      t.name.toLowerCase().includes(currentSearch) ||
      (t.desc && t.desc.toLowerCase().includes(currentSearch));
    const matchFilter = currentFilter === 'all' ||
      (currentFilter === 'con-flujo' ? t.flow && t.flow.length > 0 : t.cat === currentFilter);
    return matchSearch && matchFilter;
  });
}

function renderTasks() {
  const grid = document.getElementById('task-grid');
  const filtered = getFilteredTasks();

  document.getElementById('task-count').textContent = `${tasks.length} tareas`;
  document.getElementById('stat-total').textContent = tasks.length;
  document.getElementById('stat-flow').textContent = tasks.filter(t => t.flow && t.flow.length > 0).length;


  if (filtered.length === 0) {
    grid.innerHTML = `<div class="empty-state">
      <svg width="40" height="40" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" style="margin: 0 auto 1rem; display:block; color:var(--text-hint)"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
      <p>No se encontraron tareas con ese filtro.</p>
    </div>`;
    return;
  }

  grid.innerHTML = filtered.map(t => renderCard(t)).join('');
}

function renderCard(t) {
  const hasFlow = t.flow && t.flow.length > 0;
  const catClass = CAT_CLASSES[t.cat] || 'cat-ops';

  const flowSteps = hasFlow
    ? t.flow.map((s, i) => `<div class="flow-step"><span class="step-num">${i + 1}</span><span>${escHtml(s)}</span></div>`).join('')
    : `<p class="no-flow">Sin flujo documentado aún.</p>`;

  return `
    <div class="task-card" data-id="${t.id}">
      <div class="card-accent-bar"></div>
      <div class="card-body">
        <div class="card-top">
          <span class="card-title">${escHtml(t.name)}</span>
          <div class="card-actions">
            <button class="icon-btn" title="Editar" onclick="openEditModal(${t.id})">
              <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
            </button>
            <button class="icon-btn del" title="Eliminar" onclick="deleteTask(${t.id})">
              <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>
            </button>
          </div>
        </div>
        ${t.desc ? `<p class="card-desc">${escHtml(t.desc)}</p>` : ''}
        <div class="card-meta">
          <span class="time-badge">
            <svg width="11" height="11" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            ${escHtml(t.time)}
          </span>
          <span class="category-badge ${catClass}">${escHtml(t.cat)}</span>
        </div>
      </div>
      <button class="flow-toggle" onclick="toggleFlow(this)">
        <span>${hasFlow ? '📋 Ver flujo paso a paso (' + t.flow.length + ' pasos)' : '📋 Sin flujo documentado'}</span>
        <span class="arrow">▾</span>
      </button>
      <div class="flow-body">
        ${flowSteps}
      </div>
    </div>
  `;
}

function escHtml(str) {
  if (!str) return '';
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function toggleFlow(btn) {
  btn.classList.toggle('open');
  btn.nextElementSibling.classList.toggle('open');
}

// ===================== CATEGORY CONTROLS =====================
function renderCategoryControls() {
  const pills = document.getElementById('filter-pills');
  pills.innerHTML =
    `<span class="pill active" data-filter="all">Todas</span>` +
    CATEGORIES.map(c => `<span class="pill" data-filter="${escHtml(c)}">${escHtml(c)}</span>`).join('');
  pills.querySelectorAll('.pill').forEach(p => {
    p.addEventListener('click', () => setFilter(p.dataset.filter, p));
  });

  document.getElementById('f-cat').innerHTML =
    CATEGORIES.map(c => `<option value="${escHtml(c)}">${escHtml(c)}</option>`).join('');
}

// ===================== FILTER =====================
function setFilter(val, el) {
  currentFilter = val;
  document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
  el.classList.add('active');
  renderTasks();
}

function filterTasks() {
  currentSearch = document.getElementById('search-input').value.toLowerCase().trim();
  renderTasks();
}

// ===================== MODAL =====================
function openAddModal() {
  editingId = null;
  document.getElementById('modal-title').textContent = 'Nueva tarea';
  document.getElementById('edit-id').value = '';
  document.getElementById('f-name').value = '';
  document.getElementById('f-desc').value = '';
  document.getElementById('f-time').value = '';
  document.getElementById('f-cat').value = CATEGORIES[0];
  document.getElementById('f-flow').value = '';
  document.getElementById('task-modal').classList.add('open');
}

function openEditModal(id) {
  const t = tasks.find(t => t.id === id);
  if (!t) return;
  editingId = id;
  document.getElementById('modal-title').textContent = 'Editar tarea';
  document.getElementById('edit-id').value = id;
  document.getElementById('f-name').value = t.name;
  document.getElementById('f-desc').value = t.desc || '';
  document.getElementById('f-time').value = t.time;
  document.getElementById('f-cat').value = t.cat;
  document.getElementById('f-flow').value = (t.flow || []).join('\n');
  document.getElementById('task-modal').classList.add('open');
}

function closeModal(id) {
  document.getElementById(id).classList.remove('open');
}

function saveTask() {
  const name = document.getElementById('f-name').value.trim();
  const time = document.getElementById('f-time').value.trim();
  if (!name || !time) { alert('El nombre y el tiempo estimado son obligatorios.'); return; }

  const flowRaw = document.getElementById('f-flow').value;
  const flow = flowRaw.split('\n').map(l => l.trim()).filter(Boolean);

  if (editingId) {
    const idx = tasks.findIndex(t => t.id === editingId);
    if (idx > -1) {
      tasks[idx] = {
        ...tasks[idx],
        name,
        desc: document.getElementById('f-desc').value.trim(),
        time,
        cat: document.getElementById('f-cat').value,
        flow,
      };
    }
  } else {
    tasks.push({
      id: nextId(),
      name,
      desc: document.getElementById('f-desc').value.trim(),
      time,
      cat: document.getElementById('f-cat').value,
      flow,
    });
  }

  saveTasks();
  renderTasks();
  closeModal('task-modal');
}

function deleteTask(id) {
  if (!confirm('¿Eliminar esta tarea?')) return;
  tasks = tasks.filter(t => t.id !== id);
  saveTasks();
  renderTasks();
}

// ===================== SETTINGS =====================
function openSettings() {
  document.getElementById('settings-modal').classList.add('open');
  renderAccentOptions();
}

const ACCENTS = [
  { name: 'Verde', hex: '#2D5A3D' },
  { name: 'Azul', hex: '#1A4A7A' },
  { name: 'Terracota', hex: '#8B4A2E' },
  { name: 'Púrpura', hex: '#5A2D8A' },
  { name: 'Ocre', hex: '#7A5520' },
  { name: 'Rojo', hex: '#8B2E2E' },
  { name: 'Índigo', hex: '#2D3A8A' },
  { name: 'Pino', hex: '#1A5A3D' },
];

function renderAccentOptions() {
  const container = document.getElementById('accent-options');
  const current = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();
  container.innerHTML = ACCENTS.map(a => `
    <div class="accent-dot${a.hex === current ? ' active' : ''}"
      style="background:${a.hex};"
      title="${a.name}"
      onclick="setAccent('${a.hex}')">
    </div>
  `).join('');
}

function setAccent(hex) {
  // Derive lighter variants
  document.documentElement.style.setProperty('--accent', hex);
  document.documentElement.style.setProperty('--accent2', hex);
  localStorage.setItem('mapa-accent', hex);
  renderAccentOptions();
}

function applyGridSize(val) {
  document.getElementById('task-grid').style.gridTemplateColumns = `repeat(auto-fill, minmax(${val}px, 1fr))`;
  localStorage.setItem('mapa-grid', val);
}

// ===================== EXPORT / IMPORT =====================
function exportData() {
  const blob = new Blob([JSON.stringify(tasks, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'mapa-tareas.json';
  a.click();
  URL.revokeObjectURL(url);
}

function importData(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    try {
      const imported = JSON.parse(ev.target.result);
      if (!Array.isArray(imported)) throw new Error('Formato inválido');
      if (!confirm(`¿Importar ${imported.length} tareas? Esto reemplazará las tareas actuales.`)) return;
      tasks = imported;
      saveTasks();
      renderTasks();
      closeModal('settings-modal');
    } catch (err) {
      alert('Error al importar: el archivo no tiene el formato correcto.');
    }
  };
  reader.readAsText(file);
  e.target.value = '';
}

// ===================== INIT =====================
function init() {
  renderCategoryControls();
  loadTasks();
  renderTasks();

  // Restore saved accent
  const savedAccent = localStorage.getItem('mapa-accent');
  if (savedAccent) setAccent(savedAccent);

  // Restore grid size
  const savedGrid = localStorage.getItem('mapa-grid');
  if (savedGrid) {
    document.getElementById('grid-size').value = savedGrid;
    document.getElementById('grid-size-val').textContent = savedGrid + 'px';
    applyGridSize(savedGrid);
  }

  // Close modal on overlay click
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', e => {
      if (e.target === overlay) overlay.classList.remove('open');
    });
  });

  // ESC key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.open').forEach(m => m.classList.remove('open'));
    }
  });
}

init();