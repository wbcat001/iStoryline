async function uploadFile() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await fetch('http://localhost:5050/api/upload', {
            method: 'POST',
            body: formData
        });
        const data = await response.json();
        document.getElementById('uploadResponse').innerText = JSON.stringify(data, null, 2);
    } catch (error) {
        console.error('Error uploading file:', error);
        document.getElementById('uploadResponse').innerText = 'Error uploading file.';
    }
}

async function getLayout() {
    const id = document.getElementById('layoutId').value;
    try {
        const response = await fetch(`http://localhost:5050/api/layout?id=${id}`);
        const data = await response.json();
        document.getElementById('layoutResponse').innerText = JSON.stringify(data, null, 2);
    } catch (error) {
        console.error('Error getting layout:', error);
        document.getElementById('layoutResponse').innerText = 'Error getting layout.';
    }
}

async function updateLayout() {
    const id = document.getElementById('updateId').value;
    const newLayoutData = document.getElementById('updateData').value;
    const requestBody = {
        id: id,
        newLayoutData: JSON.parse(newLayoutData) // Parse JSON data
    };

    try {
        const response = await fetch('http://localhost:5050/api/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });
        const data = await response.json();
        document.getElementById('updateResponse').innerText = JSON.stringify(data, null, 2);
    } catch (error) {
        console.error('Error updating layout:', error);
        document.getElementById('updateResponse').innerText = 'Error updating layout.';
    }
}