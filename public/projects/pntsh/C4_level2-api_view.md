flowchart TB
    subgraph LaravelAPI[Laravel API]
      auth[Auth & Sanctum]
      groups[Groups & Membership]
      invites[Invites/Invite Links]
      fees[Group Fees]
      payments[Payments]
      withdrawals[Withdrawals]
      notify[Notification Service]
      adminc[Admin/Filament Modules]
    end

    db[(MySQL)]
    paystack[Paystack]
    hubtel[Hubtel SMS]
    fcm[Firebase]
    mail[SMTP]

    auth --> db
    groups --> db
    invites --> db
    fees --> db
    payments --> db
    withdrawals --> db
    adminc --> db

    payments --> paystack
    withdrawals --> paystack
    withdrawals --> hubtel
    notify --> fcm
    notify --> mail