// Initialize AWS SDK
AWS.config.update({
    region: 'eu-north-1', // Replace with your AWS region
    accessKeyId: '******', // Replace with your AWS access key
    secretAccessKey: '*******' // Replace with your AWS secret access key
});

// Create DynamoDB service object
var dynamodb = new AWS.DynamoDB();

// Define DynamoDB table name
var tableName = 'todo'; // Replace with your DynamoDB table name

// Function to create a record in DynamoDB
function createRecord() {
    var id = document.getElementById('idInput').value;
    var things = document.getElementById('thingsInput').value;
    var category = document.getElementById('categoryInput').value;
    var quantity = document.getElementById('quantityInput').value;

    var params = {
        TableName: tableName,
        Item: {
            'id': { S: id },
            'things': { S: things },
            'category': { S: category },
            'quantity': { N: quantity }
        }
    };

    dynamodb.putItem(params, function(err, data) {
        if (err) {
            console.error('Error creating item:', err);
        } else {
            console.log('Item created successfully:', data);
        }
    });
}

// Function to read all records from DynamoDB
function readRecords() {
    dynamodb.scan({ TableName: tableName }, function(err, data) {
        if (err) {
            console.error('Error reading items:', err);
        } else {
            var recordsDiv = document.getElementById('records');
            recordsDiv.innerHTML = ''; // Clear previous records
            data.Items.forEach(function(item) {
                recordsDiv.innerHTML += 'ID: ' + item.id.S + ', Things: ' + item.things.S + ', Category: ' + item.category.S + ', Quantity: ' + item.quantity.N + '<br>';
            });
        }
    });
}

// Function to update a record in DynamoDB
function updateRecord() {
    var id = document.getElementById('updateIdInput').value;
    var newThings = document.getElementById('updateThingsInput').value;
    var newCategory = document.getElementById('updateCategoryInput').value;
    var newQuantity = document.getElementById('updateQuantityInput').value;

    var params = {
        TableName: tableName,
        Key: { 'id': { S: id } },
        UpdateExpression: 'SET #t = :newThings, #c = :newCategory, #q = :newQuantity',
        ExpressionAttributeNames: { '#t': 'things', '#c': 'category', '#q': 'quantity' },
        ExpressionAttributeValues: {
            ':newThings': { S: newThings },
            ':newCategory': { S: newCategory },
            ':newQuantity': { N: newQuantity }
        }
    };

    dynamodb.updateItem(params, function(err, data) {
        if (err) {
            console.error('Error updating item:', err);
        } else {
            console.log('Item updated successfully:', data);
        }
    });
}

// Function to delete a record from DynamoDB
function deleteRecord() {
    var id = document.getElementById('deleteInput').value;

    var params = {
        TableName: tableName,
        Key: { 'id': { S: id } }
    };

    dynamodb.deleteItem(params, function(err, data) {
        if (err) {
            console.error('Error deleting item:', err);
        } else {
            console.log('Item deleted successfully:', data);
        }
    });
}
