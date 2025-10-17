document.addEventListener('DOMContentLoaded', () => {
    const newNoteInput = document.getElementById('newNote');
    const addNoteBtn = document.getElementById('addNoteBtn');
    const noteList = document.getElementById('noteList');
    
    loadNotes();

    addNoteBtn.addEventListener('click', addNote);
    newNoteInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addNote();
        }
    });

    function addNote() {
        const noteText = newNoteInput.value.trim();
        if (noteText === '') {
            return;
        }

        createNoteElement(noteText);
        saveNotes();
        newNoteInput.value = '';
    }

    function createNoteElement(text, isCompleted = false) {
        const li = document.createElement('li');
        li.className = 'note-item';
        if (isCompleted) {
            li.classList.add('completed');
        }
        
        li.innerHTML = `
            <span class="note-text">${text}</span>
            <div class="note-actions">
                <button class="complete-btn" title="Marcar como concluído">✓</button>
                <button class="delete-btn" title="Excluir">✗</button>
            </div>
        `;

        noteList.appendChild(li);

        li.querySelector('.complete-btn').addEventListener('click', () => {
            li.classList.toggle('completed');
            saveNotes();
        });

        li.querySelector('.delete-btn').addEventListener('click', () => {
            noteList.removeChild(li);
            saveNotes();
        });
    }

    function saveNotes() {
        const notes = [];
        noteList.querySelectorAll('.note-item').forEach(item => {
            notes.push({
                text: item.querySelector('.note-text').innerText,
                completed: item.classList.contains('completed')
            });
        });
        localStorage.setItem('notes', JSON.stringify(notes));
    }

    function loadNotes() {
        const savedNotes = localStorage.getItem('notes');
        if (savedNotes) {
            const notes = JSON.parse(savedNotes);
            notes.forEach(note => {
                createNoteElement(note.text, note.completed);
            });
        }
    }
});