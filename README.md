# 🥗 NutriTrack

> App de rastreamento nutricional com visual **glassmorphism** e animações fluidas — feito com React Native.

Acompanhe calorias, macros e refeições do dia a dia com uma interface moderna, leve e bonita. ✨

---

## ✨ Funcionalidades

| Aba | O que faz |
|-----|-----------|
| 📅 **Today** | Dashboard com anel de calorias, macros e lista de refeições do dia |
| 📊 **History** | Histórico semanal e progresso diário |
| 🍎 **Foods** | Catálogo de alimentos com busca, filtros e log rápido |
| ⚙️ **Settings** | Perfil, metas de calorias/proteína e preferências |

**Extras:**
- ➕ Adicionar, editar e remover refeições
- 📝 Registrar alimentos direto da aba Foods
- 💾 Persistência local com AsyncStorage
- 🫧 UI glass com blur, brilho e bordas luminosas
- 🎬 Animações com Moti + Reanimated (transições, stagger, micro-interações)

---

## 🛠️ Stack

- **React Native** 0.86 · **React** 19 · **TypeScript**
- **Moti** + **Reanimated** — animações
- **Gesture Handler** — gestos
- **BlurView** — efeito glass nativo (iOS)
- **SVG** — anel de calorias
- **AsyncStorage** — dados offline

---

## 📁 Estrutura

```
samplescreen/
├── App.tsx                 # Navegação por abas + provider
├── src/
│   ├── components/         # UI (LiquidGlass, MealCard, TabBar…)
│   ├── screens/            # Today, History, Foods, Settings
│   ├── context/            # Estado global (NutriContext)
│   ├── storage/            # Persistência AsyncStorage
│   ├── theme/              # Cores, tipografia, tokens glass
│   └── utils/              # Cálculos, motion, performance
└── scripts/                # Automação Windows / Android
```

---

## 📋 Pré-requisitos

- **Node.js** ≥ 22.11
- **npm** ou **yarn**
- **Android SDK** (para Android / emulador)
- **BlueStacks** ou emulador Android (opcional, para testes no Windows)

---

## 🚀 Como rodar

### 1️⃣ Instalar dependências

```bash
npm install
```

### 2️⃣ Configurar Android SDK (Windows, primeira vez)

```powershell
.\scripts\setup-android-sdk.ps1
```

### 3️⃣ Iniciar o Metro

Abra um terminal na raiz do projeto:

```bash
npm start
```

> O script `start-metro.ps1` limpa cache, libera a porta 8081 e inicia o bundler pelo caminho real do projeto.

### 4️⃣ Build e instalação (Windows + BlueStacks)

Em **outro terminal**:

```bash
npm run android:win
```

No BlueStacks: **Configurações → Avançado → Depuração Android (ADB) = ON**

Para conectar manualmente ao BlueStacks:

```bash
npm run bluestacks
```

### 🍎 iOS (macOS)

```bash
bundle install
bundle exec pod install
npm run ios
```

---

## 📜 Scripts disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm start` | Inicia Metro (com reset de cache) |
| `npm run start:metro` | Inicia Metro sem reset |
| `npm run android:win` | Build Android no Windows + instala no BlueStacks |
| `npm run android` | `react-native run-android` (padrão CLI) |
| `npm run bluestacks` | Conecta ADB ao BlueStacks |
| `npm run ios` | Roda no simulador iOS |
| `npm test` | Testes Jest |
| `npm run lint` | ESLint |

---

## 🔄 Reload & Dev Menu

| Ação | Atalho |
|------|--------|
| 🔄 Reload rápido | `R` `R` no emulador |
| 🛠️ Dev Menu | `Ctrl` + `M` (Windows) · `Cmd` + `M` (macOS) |

---

## 🐛 Troubleshooting

| Problema | Solução |
|----------|---------|
| 🔴 Metro SHA-1 / erro 500 | Rode `npm start` (nunca pelo drive `S:`). Mate processos na porta 8081 |
| ⚛️ Invalid hook call (React duplicado) | `npm install` roda `dedupe-react.js` no postinstall |
| 💾 Dados não persistem | Rebuild do APK: `npm run android:win` |
| 📱 BlueStacks não conecta | `npm run bluestacks` · confira ADB habilitado |
| 🐌 App lagado no emulador | Normal no Android — blur e animações pesam mais que no device real |

---

## 🎨 Design

Interface inspirada em **liquid glass** / glassmorphism:

- Superfícies translúcidas com blur
- Blobs animados no fundo
- Cards com brilho superior
- Transições suaves entre abas
- Feedback tátil nos botões e cards

---

## 📄 Licença

Projeto privado · uso interno / estudo.

---

<p align="center">
  Feito com 💚 e React Native
</p>
