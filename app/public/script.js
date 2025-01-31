document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('create-thread-form');
    const threadList = document.querySelector('.forum-threads ul');

    // Load threads on page load
    fetch('/api/threads')
        .then(response => response.json())
        .then(data => {
            data.forEach(thread => {
                const threadItem = document.createElement('li');
                threadItem.innerHTML = `<a href="#" data-id="${thread.id}">${thread.title}</a>`;
                threadList.appendChild(threadItem);
            });

            // Add click event listener for each thread
            const threadLinks = document.querySelectorAll('.forum-threads a');
            threadLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const threadId = link.getAttribute('data-id');
                    fetch(`/thread/${threadId}`)
                        .then(response => response.json())
                        .then(thread => {
                            alert(`Title: ${thread.title}\n\nContent: ${thread.content}`);
                        })
                        .catch(error => console.error('Error loading thread content:', error));
                });
            });
        })
        .catch(error => console.error('Error fetching threads:', error));

    // Handle form submission for new thread
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;

        const threadData = { title, content };

        fetch('/api/threads', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(threadData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.id) {
                const threadItem = document.createElement('li');
                threadItem.innerHTML = `<a href="#" data-id="${data.id}">${data.title}</a>`;
                threadList.appendChild(threadItem);
            } else {
                alert('Error creating thread');
            }
        })
        .catch(error => console.error('Error:', error));
    });
});

