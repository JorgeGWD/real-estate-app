# 🏠 Real Estate App

Aplicación tipo marketplace para la gestión de propiedades inmobiliarias.  
Frontend en **Next.js** y backend en **ASP.NET Core + MongoDB**.

---

## 🚀 Tecnologías
- **Backend**: .NET 8/9 (C#), MongoDB, Repository Pattern, DTOs, Seed Data.
- **Frontend**: Next.js 15 (App Router), React 19, TypeScript, CSS plano.
- **Tests**: Jest + Testing Library (frontend).

---

## 📂 Estructura del proyecto
```
real-estate-app/
│
├── backend/
│   │── RealEstateAPI.sln
│   └── src/RealEstateAPI/
│       ├── Program.cs
│       ├── appsettings.json
│       ├── Controllers/
│       │   └── PropertiesController.cs
│       ├── Models/
│       │   └── Property.cs
│       ├── DTOs/
│       │   └── PropertyDto.cs
│       ├── Services/
│       │   └── PropertyService.cs
│       ├── Repositories/
│       │   └── PropertyRepository.cs
│       └── Data/
│           └── SeedData.cs
│
├── frontend/
│   │── package.json
│   │── tsconfig.json
│   │── next.config.ts
│   │── jest.config.js
│   │── jest.setup.tsx
│   │
│   ├── src/
│   │   ├── pages/
│   │   │   ├── index.tsx
│   │   │   └── property/[id].tsx
│   │   ├── components/
│   │   │   ├── PropertyCard.tsx
│   │   │   └── FilterBar.tsx
│   │   ├── services/
│   │   │   └── propertyService.ts
│   │   └── styles/
│   │       └── globals.css
│   │
│   └── public/
│       └── placeholder.png
│
├── tests/
│   └── frontend/
│       ├── src/components/__tests__/
│       │   ├── PropertyCard.test.tsx
│       │   └── FilterBar.test.tsx
│       └── src/pages/__tests__/
│           └── index.test.tsx
│
├── README.md
└── .gitignore
```

---

## ⚙️ Backend

### 🔧 Requisitos
- .NET 8/9 SDK
- MongoDB

### ▶️ Ejecutar
```bash
cd backend/src/RealEstateAPI
dotnet restore
dotnet watch run
```

El backend se expone por defecto en:  
`http://localhost:5000`  

---

## 💻 Frontend

### 🔧 Requisitos
- Node.js 20+
- npm o yarn

### ▶️ Ejecutar
```bash
cd frontend
npm install
npm run dev
```

Frontend disponible en:  
`http://localhost:3000`

---

## 🧪 Tests (Frontend)

Los tests están configurados con **Jest + Testing Library**.

Ejecutar:
```bash
cd frontend
npm test
```

---

## 📌 Notas importantes
- El campo `image` es ahora consistente entre **Backend (DTO)** y **Frontend**.  
- Los archivos `*.test.tsx` fueron configurados para **ser ignorados en el build de Next.js**, evitando errores en Vercel.  
- Los tests unitarios se mantienen en las carpetas `__tests__` dentro del frontend.
