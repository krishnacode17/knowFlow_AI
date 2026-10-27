import { useState } from "react";
import {
  UserRound,
  Palette,
  BrainCircuit,
  Bell,
  ShieldCheck,
  Camera,
  Save,
  Sun,
  Moon,
  Monitor,
  Check,
  Sparkles,
  SlidersHorizontal,
  LockKeyhole,
  MonitorSmartphone,
  LogOut,
  Eye,
  EyeOff,
} from "lucide-react";

const settingsSections = [
  { id: "profile", label: "Profile", icon: UserRound },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "ai", label: "AI Preferences", icon: BrainCircuit },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: ShieldCheck },
];

const themeOptions = [
  {
    id: "light",
    label: "Light",
    description: "Clean and bright",
    Icon: Sun,
    preview: "bg-gray-100",
    panel: "bg-white",
  },
  {
    id: "dark",
    label: "Dark",
    description: "Easy on the eyes",
    Icon: Moon,
    preview: "bg-gray-900",
    panel: "bg-gray-800",
  },
  {
    id: "system",
    label: "System",
    description: "Follow device settings",
    Icon: Monitor,
    preview: "bg-gradient-to-r from-white to-gray-800",
    panel: "bg-gray-200",
  },
];

const Settings = () => {
  const [activeSection, setActiveSection] = useState("profile");

  const [name, setName] = useState("Alex Morgan");
  const [email, setEmail] = useState("alex@example.com");
  const [bio, setBio] = useState(
    "Building ideas and organizing knowledge with AI.",
  );

  const [theme, setTheme] = useState("light");
  const [aiModel, setAiModel] = useState("llama-3.3-70b-versatile");
  const [responseStyle, setResponseStyle] = useState("balanced");
  const [creativity, setCreativity] = useState(0.5);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [notifications, setNotifications] = useState({
    documentUpdates: true,
    aiTaskUpdates: true,
    weeklySummary: false,
  });

  const activeSettings = settingsSections.find(
    (section) => section.id === activeSection,
  );

  const ActiveIcon = activeSettings?.icon || UserRound;

  return (
    <div className="min-h-screen bg-[#f7f7fb] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Page Header */}
        <div>
          <p className="text-sm text-gray-500">Workspace / Settings</p>

          <h1 className="mt-2 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Settings
          </h1>

          <p className="mt-2 text-sm text-gray-500 sm:text-base">
            Manage your account and personalize your KnowFlow experience.
          </p>
        </div>

        {/* Settings Layout */}
        <div className="mt-8 grid grid-cols-1 items-start gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
          {/* Settings Navigation */}
          <aside className="rounded-2xl border border-gray-200 bg-white p-3">
            <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
              Preferences
            </p>

            <nav className="flex gap-1 overflow-x-auto lg:flex-col">
              {settingsSections.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setActiveSection(id)}
                  aria-current={activeSection === id ? "page" : undefined}
                  className={`flex shrink-0 items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition lg:w-full ${
                    activeSection === id
                      ? "bg-purple-50 text-[#5140c9]"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <Icon size={18} />
                  {label}
                </button>
              ))}
            </nav>
          </aside>

          {/* Settings Content */}
          <main className="min-w-0">
            {/* Profile Section */}
            {activeSection === "profile" && (
              <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
                <div className="border-b border-gray-100 p-5 sm:p-7">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Profile information
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Update your personal details and how you appear in KnowFlow.
                  </p>
                </div>

                <form
                  className="p-5 sm:p-7"
                  onSubmit={(event) => event.preventDefault()}
                >
                  {/* Profile Photo */}
                  <div className="flex flex-col gap-4 border-b border-gray-100 pb-6 sm:flex-row sm:items-center">
                    <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-purple-100 text-2xl font-semibold text-[#5140c9]">
                      {name.trim().charAt(0).toUpperCase() || "U"}
                    </div>

                    <div>
                      <p className="font-medium text-gray-900">Profile photo</p>

                      <p className="mt-1 text-sm text-gray-500">
                        Personalize your account appearance.
                      </p>
                  
                    </div>
                  </div>

                  {/* Profile Fields */}
                  <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="settings-name"
                        className="mb-2 block text-sm font-medium text-gray-700"
                      >
                        Full name
                      </label>

                      <input
                        id="settings-name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        maxLength={80}
                        className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#5140c9] focus:ring-2 focus:ring-purple-100"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="settings-email"
                        className="mb-2 block text-sm font-medium text-gray-700"
                      >
                        Email address
                      </label>

                      <input
                        id="settings-email"
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#5140c9] focus:ring-2 focus:ring-purple-100"
                      />
                    </div>
                                     
                  </div>

                  <div className="mt-6 flex justify-end border-t border-gray-100 pt-5">
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#5140c9] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#4932c8]"
                    >
                      <Save size={17} />
                      Save changes
                    </button>
                  </div>
                </form>
              </section>
            )}

            {/* Appearance Section */}
            {activeSection === "appearance" && (
              <section className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-7">
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Appearance
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Customize how KnowFlow AI looks on your device.
                  </p>
                </div>

                <h3 className="mb-3 text-sm font-medium text-gray-800">
                  Theme preference
                </h3>

                {/* Theme Options */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  {themeOptions.map(
                    ({ id, label, description, Icon, preview, panel }) => (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setTheme(id)}
                        aria-pressed={theme === id}
                        className={`rounded-xl border-2 p-3 text-left transition ${
                          theme === id
                            ? "border-[#5140c9] bg-purple-50/50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        {/* Theme Preview */}
                        <div
                          className={`mb-3 flex h-24 gap-2 overflow-hidden rounded-lg p-2 ${preview}`}
                        >
                          <div className="w-1/4 rounded-md bg-[#5140c9]" />

                          <div className={`flex-1 rounded-md p-2 ${panel}`}>
                            <div className="mb-2 h-2 w-3/4 rounded bg-gray-400/50" />
                            <div className="h-2 w-1/2 rounded bg-gray-400/30" />
                            <div className="mt-3 h-2 w-2/3 rounded bg-gray-400/30" />
                          </div>
                        </div>

                        {/* Theme Label */}
                        <div className="flex items-center justify-between gap-2">
                          <div>
                            <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                              <Icon size={16} />
                              {label}
                            </div>

                            <p className="mt-1 text-xs text-gray-500">
                              {description}
                            </p>
                          </div>

                          {theme === id && (
                            <Check
                              size={18}
                              className="shrink-0 text-[#5140c9]"
                            />
                          )}
                        </div>
                      </button>
                    ),
                  )}
                </div>

                {/* Selected Theme */}
                <div className="mt-6 rounded-xl bg-gray-50 p-4">
                  <div className="flex items-start gap-3">
                    <Palette size={19} className="mt-0.5 text-[#5140c9]" />

                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        Theme preference
                      </p>

                      <p className="mt-1 text-sm text-gray-500">
                        Selected theme:{" "}
                        <span className="font-medium capitalize text-[#5140c9]">
                          {theme}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end border-t border-gray-100 pt-5">
                  <button
                    type="button"
                    onClick={() => setTheme(theme)}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#5140c9] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#4932c8]"
                  >
                    <Check size={17} />
                    Preference selected
                  </button>
                </div>
              </section>
            )}

            {/* AI Preferences Section */}
            {activeSection === "ai" && (
              <section className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-7">
                <div className="border-b border-gray-100 pb-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-[#5140c9]">
                      <BrainCircuit size={22} />
                    </div>

                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">
                        AI Preferences
                      </h2>
                      <p className="mt-1 text-sm text-gray-500">
                        Customize how KnowFlow AI responds to you.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-7 pt-6">
                  {/* Default Model */}
                  <div>
                    <label
                      htmlFor="ai-model"
                      className="mb-2 block text-sm font-semibold text-gray-800"
                    >
                      Default AI model
                    </label>

                    <p className="mb-3 text-sm text-gray-500">
                      Choose the model you want to use for your conversations.
                    </p>

                    <select
                      id="ai-model"
                      value={aiModel}
                      onChange={(event) => setAiModel(event.target.value)}
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-none focus:border-[#5140c9] focus:ring-2 focus:ring-purple-100"
                    >
                      <option value="llama-3.3-70b-versatile">
                        Llama 3.3 70B
                      </option>
                      <option value="openai/gpt-oss-20b">GPT OSS 20B</option>
                    </select>

                    <p className="mt-2 text-xs text-gray-400">
                      Available options depend on your configured AI provider.
                    </p>
                  </div>

                  {/* Response Style */}
                  <div>
                    <h3 className="mb-2 text-sm font-semibold text-gray-800">
                      Response style
                    </h3>

                    <p className="mb-3 text-sm text-gray-500">
                      Choose how detailed you want your answers to be.
                    </p>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                      {[
                        {
                          id: "concise",
                          label: "Concise",
                          description: "Short and direct answers",
                        },
                        {
                          id: "balanced",
                          label: "Balanced",
                          description: "Clear, helpful explanations",
                        },
                        {
                          id: "detailed",
                          label: "Detailed",
                          description: "More depth and examples",
                        },
                      ].map((style) => (
                        <button
                          key={style.id}
                          type="button"
                          onClick={() => setResponseStyle(style.id)}
                          aria-pressed={responseStyle === style.id}
                          className={`rounded-xl border-2 p-4 text-left transition ${
                            responseStyle === style.id
                              ? "border-[#5140c9] bg-purple-50/50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-sm font-semibold text-gray-900">
                              {style.label}
                            </span>

                            {responseStyle === style.id && (
                              <Check size={17} className="text-[#5140c9]" />
                            )}
                          </div>

                          <p className="mt-2 text-xs leading-5 text-gray-500">
                            {style.description}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Creativity */}
                  <div>
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <h3 className="text-sm font-semibold text-gray-800">
                          Creativity level
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          Control how predictable or creative responses should
                          be.
                        </p>
                      </div>

                      <span className="shrink-0 rounded-lg bg-purple-50 px-3 py-1.5 text-sm font-semibold text-[#5140c9]">
                        {creativity.toFixed(1)}
                      </span>
                    </div>

                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={creativity}
                      onChange={(event) =>
                        setCreativity(Number(event.target.value))
                      }
                      aria-label="Creativity level"
                      className="mt-5 w-full cursor-pointer accent-[#5140c9]"
                    />

                    <div className="mt-2 flex justify-between text-xs text-gray-400">
                      <span>More predictable</span>
                      <span>More creative</span>
                    </div>
                  </div>

                  {/* Current Selection Summary */}
                  <div className="rounded-xl border border-purple-100 bg-purple-50/50 p-4">
                    <div className="flex items-start gap-3">
                      <Sparkles
                        size={20}
                        className="mt-0.5 shrink-0 text-[#5140c9]"
                      />

                      <div>
                        <h3 className="text-sm font-semibold text-gray-900">
                          Your AI setup
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-gray-600">
                          Model:{" "}
                          <span className="font-medium text-gray-900">
                            {aiModel}
                          </span>
                          <br />
                          Response style:{" "}
                          <span className="font-medium capitalize text-gray-900">
                            {responseStyle}
                          </span>
                          <br />
                          Creativity:{" "}
                          <span className="font-medium text-gray-900">
                            {creativity.toFixed(1)}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end border-t border-gray-100 pt-5">
                    <button
                      type="button"
                      onClick={() => {
                        setAiModel("llama-3.3-70b-versatile");
                        setResponseStyle("balanced");
                        setCreativity(0.5);
                      }}
                      className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                    >
                      Reset preferences
                    </button>
                  </div>
                </div>
              </section>
            )}

            {/* Notifications Section */}
            {activeSection === "notifications" && (
              <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
                <div className="border-b border-gray-100 p-5 sm:p-7">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-[#5140c9]">
                      <Bell size={22} />
                    </div>

                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">
                        Notifications
                      </h2>
                      <p className="mt-1 text-sm text-gray-500">
                        Choose which updates you want to receive.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-1 p-5 sm:p-7">
                  {[
                    {
                      id: "documentUpdates",
                      title: "Document processing updates",
                      description:
                        "Get notified when your documents finish processing or fail.",
                    },
                    {
                      id: "aiTaskUpdates",
                      title: "AI task completion",
                      description:
                        "Receive updates when background AI tasks are completed.",
                    },
                    {
                      id: "weeklySummary",
                      title: "Weekly activity summary",
                      description:
                        "Get a weekly overview of your conversations and knowledge base activity.",
                    },
                  ].map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between gap-4 border-b border-gray-100 py-5 last:border-0"
                    >
                      <div className="min-w-0">
                        <h3 className="text-sm font-semibold text-gray-900">
                          {item.title}
                        </h3>
                        <p className="mt-1 text-sm leading-5 text-gray-500">
                          {item.description}
                        </p>
                      </div>

                      <label className="relative inline-flex shrink-0 cursor-pointer items-center">
                        <input
                          type="checkbox"
                          checked={notifications[item.id]}
                          onChange={(event) =>
                            setNotifications((previous) => ({
                              ...previous,
                              [item.id]: event.target.checked,
                            }))
                          }
                          className="peer sr-only"
                        />

                        <span className="h-6 w-11 rounded-full bg-gray-200 transition-colors peer-checked:bg-[#5140c9] peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-[#5140c9] peer-focus-visible:ring-offset-2" />

                        <span className="pointer-events-none absolute left-0.5 top-0.5 h-5 w-5 rounded-full border border-gray-200 bg-white shadow-sm transition-transform peer-checked:translate-x-5" />

                        <span className="sr-only">Toggle {item.title}</span>
                      </label>
                    </div>
                  ))}

                  <div className="mt-5 flex items-start gap-3 rounded-xl bg-gray-50 p-4">
                    <Bell
                      size={18}
                      className="mt-0.5 shrink-0 text-[#5140c9]"
                    />
                    <p className="text-sm leading-6 text-gray-600">
                      These preferences control your desired notification types.
                      Actual notifications will be available after notification
                      delivery is implemented.
                    </p>
                  </div>

                  <div className="flex justify-end border-t border-gray-100 pt-5">
                    <button
                      type="button"
                      onClick={() =>
                        setNotifications({
                          documentUpdates: true,
                          aiTaskUpdates: true,
                          weeklySummary: false,
                        })
                      }
                      className="rounded-xl border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                    >
                      Reset preferences
                    </button>
                  </div>
                </div>
              </section>
            )}

            {activeSection === "security" && (
              <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
                <div className="border-b border-gray-100 px-5 py-5 sm:px-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-[#5140c9]">
                      <LockKeyhole size={20} />
                    </div>

                    <div>
                      <h2 className="text-base font-semibold text-gray-900">
                        Change password
                      </h2>
                      <p className="mt-1 text-sm text-gray-500">
                        Update your password to keep your account secure.
                      </p>
                    </div>
                  </div>
                </div>

                <form
                  onSubmit={(event) => event.preventDefault()}
                  className="space-y-5 p-5 sm:p-6"
                >
                  {[
                    {
                      id: "current",
                      label: "Current password",
                      value: currentPassword,
                      setValue: setCurrentPassword,
                      visible: showCurrentPassword,
                      setVisible: setShowCurrentPassword,
                      placeholder: "Enter current password",
                    },
                    {
                      id: "new",
                      label: "New password",
                      value: newPassword,
                      setValue: setNewPassword,
                      visible: showNewPassword,
                      setVisible: setShowNewPassword,
                      placeholder: "Enter new password",
                    },
                    {
                      id: "confirm",
                      label: "Confirm new password",
                      value: confirmPassword,
                      setValue: setConfirmPassword,
                      visible: showConfirmPassword,
                      setVisible: setShowConfirmPassword,
                      placeholder: "Re-enter new password",
                    },
                  ].map((field) => (
                    <div key={field.id}>
                      <label
                        htmlFor={field.id}
                        className="mb-2 block text-sm font-medium text-gray-700"
                      >
                        {field.label}
                      </label>

                      <div className="relative">
                        <input
                          id={field.id}
                          type={field.visible ? "text" : "password"}
                          value={field.value}
                          onChange={(event) =>
                            field.setValue(event.target.value)
                          }
                          placeholder={field.placeholder}
                          autoComplete="new-password"
                          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 pr-12 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#5140c9] focus:ring-4 focus:ring-purple-50"
                        />

                        <button
                          type="button"
                          onClick={() => field.setVisible(!field.visible)}
                          aria-label={
                            field.visible ? "Hide password" : "Show password"
                          }
                          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                        >
                          {field.visible ? (
                            <EyeOff size={18} />
                          ) : (
                            <Eye size={18} />
                          )}
                        </button>
                      </div>
                    </div>
                  ))}

                  <div className="flex flex-col gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs leading-5 text-gray-500">
                      Use a strong password that you don't use elsewhere.
                    </p>

                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#5140c9] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#4332b5]"
                    >
                      <LockKeyhole size={16} />
                      Update password
                    </button>
                  </div>
                </form>
              </section>
            )}

            {/* Remaining Sections: Placeholder */}
            {activeSection === "security" && (
              <div className="mt-6 space-y-6">
                {/* Active Sessions */}
                <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
                  <div className="border-b border-gray-100 px-5 py-5 sm:px-6">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-[#5140c9]">
                        <MonitorSmartphone size={20} />
                      </div>

                      <div>
                        <h2 className="text-base font-semibold text-gray-900">
                          Active sessions
                        </h2>
                        <p className="mt-1 text-sm text-gray-500">
                          Devices where your account is currently signed in.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 sm:p-6">
                    <div className="flex flex-col gap-4 rounded-xl border border-gray-200 p-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-start gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-600">
                          <MonitorSmartphone size={21} />
                        </div>

                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-sm font-semibold text-gray-900">
                              Linux · Chrome
                            </h3>
                            <span className="rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
                              Current device
                            </span>
                          </div>

                          <p className="mt-1 text-sm text-gray-500">
                            Desktop browser
                          </p>
                          <p className="mt-1 text-xs text-gray-400">
                            Last active: Just now
                          </p>
                        </div>
                      </div>

                      <span className="inline-flex w-fit items-center gap-2 text-xs font-medium text-green-700">
                        <span className="h-2 w-2 rounded-full bg-green-500" />
                        Active
                      </span>
                    </div>

                    <p className="mt-4 text-xs leading-5 text-gray-500">
                      Session information shown here is sample data. Real device
                      sessions will appear after authentication integration.
                    </p>
                  </div>
                </section>

                {/* Log out all sessions */}
                <section className="overflow-hidden rounded-2xl border border-red-200 bg-white">
                  <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
                        <LogOut size={20} />
                      </div>

                      <div>
                        <h2 className="text-base font-semibold text-gray-900">
                          Log out all sessions
                        </h2>
                        <p className="mt-1 max-w-lg text-sm leading-6 text-gray-500">
                          Sign out from all devices where your account is logged
                          in. You may need to log in again on this device.
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        window.alert(
                          "This feature will be available after API integration.",
                        )
                      }
                      className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-red-200 px-4 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
                    >
                      <LogOut size={16} />
                      Log out all
                    </button>
                  </div>
                </section>
              </div>
            )}


          </main>
        </div>
      </div>
    </div>
  );
};

export default Settings;
