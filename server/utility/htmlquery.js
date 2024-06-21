function htmlquery(requestedUser,data){
   const query =  `
  
<html lang="en">
<head>

    <title>Email Template</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f8f9fa;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 40px auto;
            padding: 20px;
            background-color: #ffffff;
            border: 1px solid #dee2e6;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .header {
            background-color: #50C878;
            color: #ffffff;
            padding: 10px 0;
            border-bottom: 1px solid #45a163;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
            font-style: italic;
        }
        .content {
            text-align: center;
            padding: 20px;
        }
        .content h1 {
            color: #50C878;
            font-style: italic;
            margin-bottom: 20px;
        }
        .content p {
            font-size: 16px;
            color: #333333;
            margin-bottom: 30px;
        }
        .content .btn {
            display: inline-block;
            padding: 12px 20px;
            font-size: 16px;
            color: #ffffff;
            background-color: #50C878;
            border: none;
            border-radius: 5px;
            text-decoration: none;
        }
        .content .btn:hover {
            background-color: #45a163;
        }
        .footer {
            text-align: center;
            font-size: 14px;
            color: #666666;
            padding: 20px;
            border-top: 1px solid #dee2e6;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Galgotias University</h1>
        </div>
        <div class="content">
            <h1>Hello ${requestedUser},</h1>
            <p>is requesting you to add them to the Project Group.</p>
            <p>Your code for approval is:</p>
            <a href="http://localhost:5000/verify" class="btn">Verify Now</a>
        </div>
        <div class="footer">
            <p>&copy; 2024 Galgotias University. All rights reserved.</p>
        </div>
    </div>
</body>
</html>

   `
}
module.exports = {htmlquery}