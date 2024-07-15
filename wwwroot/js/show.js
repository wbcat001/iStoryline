// fetchでAPIリクエストを行う関数
async function uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await fetch('http://localhost:5050/api/upload', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        if (data.error === 0) {
            return data.data.identifier; // Return the identifier for layout
        } else {
            throw new Error('File upload error: ' + data.message);
        }
    } catch (error) {
        console.error('Upload Error:', error);
        throw error;
    }
}

async function layoutStoryline(identifier) {
    try {
        const response = await fetch('http://localhost:5050/api/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: identifier })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        if (data.error === 0) {
            return {
                array: data.data.array,
                perm: data.data.perm,
                sessionTable: data.data.sessionTable
            };
        } else {
            throw new Error('Layout update error: ' + data.message);
        }
    } catch (error) {
        console.error('Layout Error:', error);
        throw error;
    }
}

document.getElementById('uploadForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    
    if (file) {
        try {
            // Upload file and get the identifier
            const identifier = await uploadFile(file);
            
            console.log(identifier);
            // Layout the storyline and get the result
            const result = await layoutStoryline(identifier);
            
            // Display results
            document.getElementById('resultOutput').textContent = JSON.stringify(result, null, 2);
        } catch (error) {
            document.getElementById('resultOutput').textContent = 'Error: ' + error.message;
        }
    } else {
        alert('Please select a file.');
    }
});
