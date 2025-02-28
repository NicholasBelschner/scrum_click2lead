## **🚀 Setup Guide for Click2Lead Scrum AI**
Follow these steps to **set up and run the project** after cloning.

### **1️⃣ Clone the Repository**
```bash
git clone [https://github.com/your-repo/click2lead-scrum.git](https://github.com/NicholasBelschner/scrum_click2lead.git)
cd click2lead-scrum
```

### **2️⃣ Setup & Activate Virtual Environment**
```bash
python -m venv venv
source venv/bin/activate  # macOS/Linux
venv\Scripts\activate     # Windows
```

### **3️⃣ Install Backend Dependencies**
```bash
pip install -r requirements.txt
```

### **4️⃣ Create `.env` File & Add API Key**
```bash
vim .env
```
**Inside `.env` file, add:**
```
OPENAI_API_KEY=your-api-key-here
```
Save and exit (`ESC` → `:wq` → ENTER).

### **5️⃣ Start the Backend**
```bash
uvicorn app:app --reload
```

### **6️⃣ Setup Frontend**
```bash
cd frontend
npm install
npm install react-icons web-vitals  # Install missing dependencies
npm start
```

### **✅ Everything is now running!**  
- **Backend:** Runs at `http://127.0.0.1:8000`
- **Frontend:** Runs at `http://localhost:3000`

---

This keeps it **short, clear, and efficient**. 🚀 Let me know if you need modifications! 🔥
