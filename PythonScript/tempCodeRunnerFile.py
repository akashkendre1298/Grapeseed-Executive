import ast
import pdfplumber
import re
import os
from pymongo import MongoClient

# MongoDB credentials
mongo_uri = "mongodb+srv://vedantassignment05:Oy6TBfr6NwolJu4Q@grapseeds.hu2f3kl.mongodb.net/?retryWrites=true&w=majority&appName=Grapseeds"
database_name = "MAXLIFE"
collection_name = "MAXLIFE_DATA"

# Connect to MongoDB
client = MongoClient(mongo_uri)
db = client[database_name]
collection = db[collection_name]

def extract_table_from_first_page(pdf_path, output_txt_path):
    with pdfplumber.open(pdf_path) as pdf:
        if len(pdf.pages) > 0:
            first_page = pdf.pages[5]
            tables = first_page.extract_tables()

            if tables:
                with open(output_txt_path, 'w', encoding='utf-8') as text_file:
                    for row in tables:
                        cleaned_row = [str(cell).replace(
                            '\n', ' ').replace('\r', '') for cell in row]
                        text_file.write('|'.join(cleaned_row) + '\n')
                print(f"Table from the first page has been saved to {output_txt_path}")
            else:
                print("No table found on the first page.")
        else:
            print("The PDF has no pages.")

def extract_text_from_first_page(pdf_path, output_txt_path):
    with pdfplumber.open(pdf_path) as pdf:
        if len(pdf.pages) > 0:
            first_page = pdf.pages[2]
            text = first_page.extract_text()

            if text:
                with open(output_txt_path, 'w', encoding='utf-8') as text_file:
                    text_file.write(text)
                print(f"Text from the first page has been saved to {output_txt_path}")
            else:
                print("No text found on the first page.")
        else:
            print("The PDF has no pages.")

pdf_path = 'uploads/106265101.pdf'
table_txt_path = 'first_page_table.txt'
text_txt_path = 'txt_file.txt'

# Extract table and text from the PDF
extract_table_from_first_page(pdf_path, table_txt_path)
extract_text_from_first_page(pdf_path, text_txt_path)

header = []
data = []

# Read the text file and extract information
with open(text_txt_path, 'r') as file:
    content = file.read()
    policyholder_name = re.search(r'Policyholder/ Life Insured (.*?) Premium Payment Mode', content).group(1).strip()
    premium_payment_mode = re.search(r'Premium Payment Mode: (.*)', content).group(1).strip()
    sum_assured = re.search(r'Sum Assured: `([\d,]+\.?\d*)', content).group(1).strip()
    policy_number = re.search(r'Policy No\.: (\d+)', content).group(1).strip()
    commencement_date = re.search(r'Date of Commencement: ([\d\w-]+)', content).group(1).strip()
    monthly_income_benefit = re.search(r'Monthly Income Benefit: ([\d,\.]+)', content).group(1).strip()
    maturity_date = re.search(r'Maturity Date: ([\d\w-]+)', content).group(1).strip()
    policy_term = re.search(r'Policy Term \(in years\): (\d+)', content).group(1).strip()
    death_benefit = re.search(r'Death Benefit: `([\d,\.]+)', content).group(1).strip()
    premium_payment_term = re.search(r'Premium Payment Term \(in (\d+)', content).group(1).strip()
    premium_amount = re.search(r'Premium Amount `([\d,\.]+)', content).group(1).strip()
    premium_payment_due_date = re.search(r'Premium Payment Due Date: (.*)', content).group(1).strip()
    last_premium_due_date = re.search(r'Last Premium Due Date: ([\d\w-]+)', content).group(1).strip()

    attributes = [
        ("Policyholder Name", policyholder_name),
        ("Premium Payment Mode", premium_payment_mode),
        ("Policy Number", policy_number),
        ("Date of Commencement", commencement_date),
        ("Sum Assured", sum_assured),
        ("Monthly Income Benefit", monthly_income_benefit),
        ("Maturity Date", maturity_date),
        ("Policy Term", policy_term),
        ("Death Benefit", death_benefit),
        ("Premium Payment Term", premium_payment_term),
        ("Premium Amount", premium_amount),
        ("Premium Payment Due Date", premium_payment_due_date),
        ("Last Premium Due Date", last_premium_due_date),
    ]

    for h, value in attributes:
        header.append(h)
        data.append(value)

# Read the table file and extract information
with open(table_txt_path, 'r') as file:
    table = file.read().strip().rstrip('\n')
    table = table.split("|")
    for i in range(len(table)):
        table[i] = ast.literal_eval(table[i])

    text = table[0][0]
    policy_no = re.search(r'Policy No./ Proposal No\.:(.*)', text).group(1).strip() if re.search(r'Policy No./ Proposal No\.:(.*)', text) else ""
    date_of_proposal = re.search(r'Date of Proposal:(.*)', text).group(1).strip() if re.search(r'Date of Proposal:(.*)', text) else ""
    header.append("Policy No./ Proposal No")
    header.append("Date of Proposal")
    data.extend([policy_no, date_of_proposal])

    text = table[0][1]
    client_id = re.search(r'Client ID:\s*(.*)', text).group(1).strip() if re.search(r'Client ID:\s*(.*)', text) else ""
    text = table[1][0]
    policyholder = re.search(r'Policyholder/Proposer :\s*(.*)', text).group(1).strip() if re.search(r'Policyholder/Proposer :\s*(.*)', text) else ""
    pan = re.search(r'PAN:\s*(.*)', text).group(1).strip() if re.search(r'PAN:\s*(.*)', text) else ""
    relationship = re.search(r'Relationship with Life Insured:\s*(.*)', text).group(1).strip() if re.search(r'Relationship with Life Insured:\s*(.*)', text) else ""
    date_of_birth = re.search(r'Date of Birth:\s*(.*)', text).group(1).strip() if re.search(r'Date of Birth:\s*(.*)', text) else ""
    address = re.search(r'Address:(.*?)(?=Date of Birth:|$)', text, re.DOTALL).group(1).strip() if re.search(r'Address:(.*?)(?=Date of Birth:|$)', text, re.DOTALL) else ""
    header.extend(["policyholder", "pan", "relationship", "date_of_birth", "address"])
    data.extend([policyholder, pan, relationship, date_of_birth, address])

    text = table[1][1]
    age_admitted = re.search(r'Age Admitted:\s*(.*)', text).group(1).strip() if re.search(r'Age Admitted:\s*(.*)', text) else ""
    gender = re.search(r'Gender:\s*(.*)', text).group(1).strip() if re.search(r'Gender:\s*(.*)', text) else ""
    tel_no = re.search(r'Tel No./Mobile No.:\s*(.*)', text).group(1).strip() if re.search(r'Tel No./Mobile No.:\s*(.*)', text) else ""
    email = re.search(r'Email:\s*(.*)', text).group(1).strip() if re.search(r'Email:\s*(.*)', text) else ""
    header.extend(["gender", "tel_no", "email"])
    data.extend([gender, tel_no, email])

    text = table[2][0]
    life_insured = re.search(r'Life Insured:\s*(.*)', text).group(1).strip() if re.search(r'Life Insured:\s*(.*)', text) else ""
    date_of_birth = re.search(r'Date of Birth:\s*(.*)', text).group(1).strip() if re.search(r'Date of Birth:\s*(.*)', text) else ""
    age = re.search(r'Age:\s*(.*)', text).group(1).strip() if re.search(r'Age:\s*(.*)', text) else ""

    text = table[2][1]
    age_admitted = re.search(r'Age Admitted:\s*(.*)', text).group(1).strip() if re.search(r'Age Admitted:\s*(.*)', text) else ""
    gender = re.search(r'Gender:\s*(.*)', text).group(1).strip() if re.search(r'Gender:\s*(.*)', text) else ""

    text = table[3][0]
    nominee = re.search(r'Nominee\(s\):\s*(.*)', text).group(1).strip() if re.search(r'Nominee\(s\):\s*(.*)', text) else ""

    # Extract Executive ID and Executive Name
    executive_id = re.search(r'Executive ID:\s*(.*)', content).group(1).strip() if re.search(r'Executive ID:\s*(.*)', content) else ""
    executive_name = re.search(r'Executive Name:\s*(.*)', content).group(1).strip() if re.search(r'Executive Name:\s*(.*)', content) else ""

    header.extend(["life_insured", "date_of_birth", "age", "age_admitted", "nominee", "Executive ID", "Executive Name"])
    data.extend([life_insured, date_of_birth, age, age_admitted, nominee, executive_id, executive_name])

# Create a dictionary for MongoDB insertion
document = dict(zip(header, data))

# Insert the document into the specified collection
collection.insert_one(document)

print("Data has been inserted into MongoDB.")

# Delete the files after processing
os.remove(pdf_path)
os.remove(table_txt_path)
os.remove(text_txt_path)
print("Files have been deleted.")
