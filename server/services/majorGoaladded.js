export const majorGoaladded = (name, title, note, dueDate) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Goal Tracker</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f9;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        h1 {
            color: #333333;
        }
        p {
            color: #666666;
            line-height: 1.6;
        }
        .header {
            display: flex;
            width: 100%;
            justify-content: space-around;
            background-color: #4CAF50;
            padding: 10px 0;
            color: white;
            margin:auto;
        }
        .goal {
            background-color: wheat;
            padding: 10px;
            margin: 10px 0;
        }      
        .content img {
            width: 100%;
            max-width: 100%;
            height: auto;
            margin: 20px 0;
        }
        .footer {
            text-align: left;
            margin: 20px 0;
            color: #999999;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src="https://firebasestorage.googleapis.com/v0/b/travel-b0639.appspot.com/o/images%2Fgoal.png?alt=media&token=bc6d5fb8-c716-4f03-bef3-21be5d4d1a8b" style="height: 40px; width: 40px; margin: auto 12px;" alt="Goal Tracker"/>
            <h1>Welcome to Goal Tracker</h1>
        </div>
        <div class="content">
            <p>Hi ${name},</p>
            <p>A New Important Goal has been added to your list.</p>
            <div class="goal">
                <div class="goalhead">
                <h3>Title: ${title}</h3>
                    <h4>Due Date: ${dueDate}</h4>
                </div>
                <h4>Note: ${note}</h4>
            </div>
            <p>now easily keep track of this goal in your tracker</p>
            <p>And Don't worry, we'll send you email remeinders when deadline is near</p>
            <a href="https://goal-manager-client.vercel.app/" target="_blank">
                <img src="https://firebasestorage.googleapis.com/v0/b/travel-b0639.appspot.com/o/images%2Fgoal.png?alt=media&token=bc6d5fb8-c716-4f03-bef3-21be5d4d1a8b" style="height: 120px; width: 120px;" alt="Goal Tracker"/>
            </a>
        </div>
        <div class="footer">
            <p>Thank you,<br>Goal Tracker Team</p>
        </div>
    </div>
</body>
</html>
`;
