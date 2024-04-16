import boto3
from os import path
from botocore.exceptions import ClientError
from config.settings import settings
from string import Template
from config.settings import settings


def send_email(subject: str, message: str, to_email: str):
    # The character encoding for the email.
    CHARSET = "UTF-8"

    SENDER = f"Pierre Du Toit <{settings.SMTP_FROM}>"

    ses = boto3.client(
        "ses",
        region_name="us-east-1",
        aws_access_key_id=settings.SMTP_USERNAME,
        aws_secret_access_key=settings.SMTP_PASSWORD,
    )

    # Try to send the email.
    try:
        # Provide the contents of the email.
        response = ses.send_email(
            Destination={
                "ToAddresses": [
                    to_email,
                ],
            },
            Message={
                "Body": {
                    "Html": {
                        "Charset": CHARSET,
                        "Data": message,
                    },
                    "Text": {
                        "Charset": CHARSET,
                        "Data": message,
                    },
                },
                "Subject": {
                    "Charset": CHARSET,
                    "Data": subject,
                },
            },
            Source=SENDER,
        )
    # Display an error if something goes wrong.
    except ClientError as e:
        print(e.response["Error"]["Message"])
    else:
        print("Email sent! Message ID:"),
        print(response["MessageId"])


def generate_user_contact_html(vals: dict = {"name": "User"}):
    template_path = path.join(settings.ROOT_DIR, "templates", "user_contact.html")
    with open(template_path, "r") as file:  # r to open file in READ mode
        html_as_string = file.read()

    template = Template(html_as_string)
    return template.safe_substitute(vals)


def generate_admin_contact_html(vals: dict = {"name": "User"}):
    template_path = path.join(settings.ROOT_DIR, "templates", "admin_contact.html")
    with open(template_path, "r") as file:  # r to open file in READ mode
        html_as_string = file.read()

    template = Template(html_as_string)
    return template.safe_substitute(vals)
