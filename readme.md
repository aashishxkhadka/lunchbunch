# Lunch Bunch

## About

**Lunch Bunch** is a mobile first, web application that allows users to create and manage their own online store. It provides a user-friendly interface for managing categories, products, orders, customers and feedbacks/reviews. The application is built using .NET Core and C# in server-side, uses EF-Core for dealing with MSSQL database and React with Typescript for the front-end.\*

## Features

- User authentication and authorization
- Categories management
- Product management
- Order management
- Customer management
- Admin dashboard
- User management
- Feedback and feedback management
- Shopping Cart
- In app notification


## Database Diagram

```mermaid
erDiagram
    User {
        Guid UserId PK
        string Username
        string Email
        string Password
        datetime DateOfBirth
        boolean IsAgeVerified
    }

    UserProfile {
        Guid ProfileId PK
        string Username
        string PhoneNumber
        string Address
        datetime DateOfBirth
        string IdentificationType
        int IdentificationNumber
    }

    Admin {
        Guid AdminId PK
        string Username
        string Email
        string Password
    }

    Product {
        Guid ProductId PK
        string Name
        string Description
        string Brand
        decimal Price
        int StockQuantity
        string ImageUrl
        decimal ABV
        int Volume
        int Rating
        int AgeRestriction
        datetime CreatedAt
        datetime UpdatedAt
        Guid CategoryId FK
    }

    Category {
        Guid CategoryId PK
        string Name
        string Description
    }

    Cart {
        Guid CartId PK
        Guid UserId FK
        Guid ProductId FK
        int Quantity
    }

    Order {
        Guid OrderId PK
        Guid UserId FK
        string ProductId
        Guid ProductId1 FK
        datetime OrderDate
        string OrderStatus
        decimal TotalPrice
        string BillingAddress
        string ShippingAddress
    }

    OrderItem {
        Guid OrderItemId PK
        Guid OrderId FK
        Guid ProductId FK
        int Quantity
        decimal Price
    }

    Feedback {
        Guid FeedbackId PK
        Guid UserId FK
        Guid ProductId FK
        string Comment
        int Rating
        datetime Date
    }

    Notification {
        Guid NotificationId PK
        string NotificationTitle
        string NotificationContent
        int NotificationType
        int NotificationContext
        datetime NotificationDate
        Guid UserId FK
    }

    User ||--o{ Cart : has
    User ||--o{ Order : places
    User ||--o{ Feedback : writes
    Product ||--o{ Cart : contains
    Product ||--o{ Feedback : receives
    Product }|--|| Category : belongs_to
    Order ||--|{ OrderItem : contains
    Product ||--o{ OrderItem : included_in
    Notification }o--|| User : sent_to
```
## Getting Started



1. Clone the repository (or you can fork it then clone from your profile) :

   Using https:

```bash
git clone https://github.com/aashishxkhadka/lunchbunch.git
```

or,
Using ssh:

```bash
git clone git@github.com:aashishxkhadka/lunchbunch.git
```

2. Navigate to the project directory:

```bash
cd lunchbunch
```

3. Restore NuGet packages:
```bash
cd server; dotnet restore
```

> [!TIP]
> You need to setup your database first, the `ConnectionString` is in `appsettings.json` file. Change that according to your database.
> Migrate the models with `dotnet ef migrations add InitialMigration` and then apply the migrations with `dotnet ef database update`.


4. Build the project:

```bash
dotnet build
```

5. Run the application:

```bash
dotnet run
```

6. Setup Frontend

```bash
cd client/
```

7.Run Frontend

```bash
pnpm install && pnpm dev
```
> [!NOTE]
> For running frontend you need have have `node` installed in your system and can also use `npm` instead of `pnpm`, for using `pnpm` you will need to install it first.
