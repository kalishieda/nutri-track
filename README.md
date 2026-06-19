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
- **Android SDK** + **Android Studio** (emulador ou dispositivo físico)

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

### 4️⃣ Build e instalação (Android)

Abra o emulador no **Android Studio** (Device Manager) ou conecte um celular com depuração USB ativa.

Em **outro terminal** (Windows — evita erro de caminho longo no build nativo):

```bash
npm run android:win
```

Em macOS/Linux, ou se o build padrão funcionar:

```bash
npm run android
```

> Carregue o ambiente Android no PowerShell, se necessário: `. .\scripts\android-env.ps1`

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
| `npm run android:win` | Build Android no Windows (caminho curto, recomendado) |
| `npm run android` | Build via CLI padrão (`react-native run-android`) |
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
| 🔴 Metro SHA-1 / erro 500 | Rode `npm start` e mate processos na porta 8081 |
| ⚛️ Invalid hook call (React duplicado) | `npm install` roda `dedupe-react.js` no postinstall |
| 💾 Dados não persistem | Rebuild do app: `npm run android` |
| 📱 Dispositivo não detectado | Abra o emulador no Android Studio ou confira `adb devices` |
| 📏 Filename longer than 260 characters | Use `npm run android:win` (mapeia drive `S:` só durante o build) |
| 🏗️ ABI x86_64 / arm64 mismatch | Emulador usa `x86_64`; celular usa `arm64-v8a` — `android:win` detecta automaticamente |
| 🔌 Porta 8081 em uso | Feche o Metro antigo ou rode `npm start` (libera a porta automaticamente) |
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
