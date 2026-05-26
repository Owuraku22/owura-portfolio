sequenceDiagram
    participant U as User (Member)
    participant API as Laravel API
    participant Pay as Paystack
    participant DB as Database
    participant O as Group Owner

    U->>API: POST /groups/{groupId}/fees/{feeId}/pay
    API->>DB: Create/Update payment (PENDING, reference)
    API->>Pay: Initialize transaction
    Pay-->>API: authorization_url
    API-->>U: payment link/reference

    Pay-->>API: Webhook charge.success
    API->>Pay: Verify transaction
    Pay-->>API: success
    API->>DB: Update payment=SUCCESS, paid_at
    API->>DB: Update fee totals (total_collected, total_paid_members)

    O->>API: POST /withdrawal/request-otp
    API->>O: OTP sent (Hubtel SMS)

    O->>API: POST /withdrawal/verify-otp
    API->>Pay: Create transfer recipient
    API->>DB: Save withdrawal_account(recipient_code)

    O->>API: POST /group/{groupId}/fee/{feeId}/withdraw-funds
    API->>DB: Validate owner, closed fee, available amount
    API->>Pay: Transfer funds
    Pay-->>API: transfer reference/status
    API->>DB: Insert group_withdrawals
    API->>DB: Increment group_fees.total_withdrawn (on success)
    API-->>O: Withdrawal result
