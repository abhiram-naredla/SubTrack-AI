# System Architecture

```mermaid
flowchart TD
    User --> Form
    Form --> AuditEngine
    AuditEngine --> Supabase
    AuditEngine --> ResultsPage
    ResultsPage --> LeadCapture
    LeadCapture --> EmailAPI
    EmailAPI --> Resend