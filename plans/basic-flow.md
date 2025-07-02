The application will be a single, vertically scrolling page divided into distinct sections for each step. Sections for subsequent steps will be disabled or hidden until the preceding step is successfully completed.

---
### **Overall Page Structure**

The page will have a main container that holds all the step-based sections. A state management system will track the user's progress (`apiKey`, `x-secret`, `connectionId`, etc.) and dynamically enable or display the next section as required.

---
### **Section 1: Create Your Account**

* **Initial State:** This is the only active section when the page first loads.
* **UI Elements:**
    * A form with input fields for **Username** and **Email**.
    * A "**Create Account & Get API Key**" button.
* **Workflow:**
    1.  The user fills out the form.
    2.  Clicking the button triggers a `POST /users` call.
    3.  Upon success, the received **apiKey** is saved.
    4.  This entire section becomes read-only or collapses, and **Section 2** becomes visible and active.

---
### **Section 2: Store Your Bitwarden Token**

* **Initial State:** Hidden or disabled until the API key is received from Section 1.
* **UI Elements:**
    * An input field for the **Bitwarden Access Token**.
    * An input field for your **Organisation ID**.
    * A "**Save Token & Get Secret**" button.
* **Workflow:**
    1.  The user provides their Bitwarden token and Organisation ID.
    2.  Clicking the button makes a `POST /api-key-store` call (using the API key from Step 1).
    3.  The **X-Secret** from the response headers is saved.
    4.  This section is disabled, and **Section 3** appears.

---
### **Section 3: Connect to a Bank**

* **Initial State:** Hidden or disabled until the X-Secret is saved.
* **UI Elements:**
    * A "**Fetch Available Banks**" button.
    * A dropdown menu or list (initially empty) to display available banks.
    * An input field for a connection **Alias**.
    * A "**Create Connection**" button (initially disabled).
* **Workflow:**
    1.  The user clicks "**Fetch Available Banks**," which triggers a `GET /banks/available`.
    2.  The returned list of banks populates the dropdown menu.
    3.  Once the user selects a bank and enters an alias, the "**Create Connection**" button is enabled.
    4.  Clicking it makes a `POST /users/banks` call. The returned `connectionId` is saved.
    5.  This section is disabled, and **Section 4** appears.

---
### **Section 4: Log In to Your Bank**

* **Initial State:** Hidden or disabled until a `connectionId` is created.
* **UI Elements:**
    * A form with input fields for **Bank Username** and **Bank Password**.
    * A "**Login**" button.
* **Workflow:**
    1.  The application first silently calls `POST /users/banks/{connectionId}/initiate-login`.
    2.  The user enters their bank credentials.
    3.  Clicking "**Login**" triggers the `POST /users/banks/{connectionId}/finalize-login` call, sending the credentials and the saved **X-Secret**.
    4.  Upon success, a confirmation message appears, this section is disabled, and **Section 5** becomes active.

---
### **Section 5: Fetch Your Transactions**

* **Initial State:** Hidden or disabled until the bank login is successful.
* **UI Elements:**
    * A "**Fetch Transactions**" button.
    * A designated area (e.g., a `<div>`) to display the results.
* **Workflow:**
    1.  The user clicks "**Fetch Transactions**".
    2.  The app makes a `GET /users/banks/{connectionId}/transactions` call, including the **X-Secret** in the headers.
    3.  The returned array of transactions is formatted and displayed in the results area. The entire process is now complete.