import { Link } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const { signInWithGoogle, isLoading, user } = useAuth();
  const navigate = useNavigate();
  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginEmailError, setLoginEmailError] = useState<string | null>(null);
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirm, setRegisterConfirm] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerEmailError, setRegisterEmailError] = useState<string | null>(null);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showRegisterConfirm, setShowRegisterConfirm] = useState(false);
const isStrongPassword = (pw: string) => /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/.test(pw);
  const passwordsMismatch =
    registerPassword.length > 0 &&
    registerConfirm.length > 0 &&
    registerPassword !== registerConfirm;
  const registerPasswordWeak = registerPassword.length > 0 && !isStrongPassword(registerPassword);

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-50 to-white flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Bem-vindo</CardTitle>
          <CardDescription>Entre na sua conta ou crie uma nova</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="entrar" className="w-full">
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="entrar">Entrar</TabsTrigger>
              <TabsTrigger value="criar">Criar conta</TabsTrigger>
            </TabsList>

            <TabsContent value="entrar">
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={loginEmail}
                    onChange={(e) => {
                      setLoginEmail(e.target.value);
                      if (loginEmailError) setLoginEmailError(null);
                    }}
                    onBlur={() => {
                      if (loginEmail && !isValidEmail(loginEmail)) setLoginEmailError("Informe um email válido");
                    }}
                  />
                  {loginEmailError && (
                    <p className="text-sm text-red-600">{loginEmailError}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>
                  <div className="relative">
                    <Input id="password" type={showLoginPassword ? "text" : "password"} placeholder="••••••••" />
                    <button
                      type="button"
                      aria-label={showLoginPassword ? "Ocultar senha" : "Mostrar senha"}
                      onClick={() => setShowLoginPassword((v) => !v)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <p className="text-xs text-muted-foreground">Mín. 6 caracteres, 1 letra maiúscula, 1 número e 1 caractere especial.</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <Link to="#" className="text-blue-600 hover:underline">Esqueci minha senha</Link>
                  </div>
                </div>
                <Button
                  type="button"
                  className="w-full"
                  onClick={() => {
                    if (!isValidEmail(loginEmail)) {
                      setLoginEmailError("Informe um email válido");
                      return;
                    }
                    // implementar ação de login tradicional aqui
                  }}
                >
                  Entrar
                </Button>
              </form>
              <div className="my-4 text-center text-xs text-muted-foreground">ou</div>
              <div className="grid grid-cols-1 gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={async () => {
                    try {
                      await signInWithGoogle();
                    } catch (e) {
                      alert("Login com Google indisponível. Verifique as chaves do Firebase.");
                    }
                  }}
                  disabled={isLoading}
                >
                  <img src="/google.png" alt="Google" className="w-5 h-5 object-contain rounded-sm" />
                  {isLoading ? "Entrando..." : "Continuar com Google"}
                </Button>
                <Button type="button" variant="outline" className="w-full">
                  <img src="/facebook.png" alt="Facebook" className="w-5 h-5 object-contain rounded-sm" />
                  Continuar com Facebook
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="criar">
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome</Label>
                  <Input id="name" type="text" placeholder="Seu nome" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email2">Email</Label>
                  <Input
                    id="email2"
                    type="email"
                    placeholder="seu@email.com"
                    value={registerEmail}
                    onChange={(e) => {
                      setRegisterEmail(e.target.value);
                      if (registerEmailError) setRegisterEmailError(null);
                    }}
                    onBlur={() => {
                      if (registerEmail && !isValidEmail(registerEmail)) setRegisterEmailError("Informe um email válido");
                    }}
                  />
                  {registerEmailError && (
                    <p className="text-sm text-red-600">{registerEmailError}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password2">Senha</Label>
                  <div className="relative">
                    <Input
                      id="password2"
                      type={showRegisterPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={registerPassword}
                      onChange={(e) => setRegisterPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      aria-label={showRegisterPassword ? "Ocultar senha" : "Mostrar senha"}
                      onClick={() => setShowRegisterPassword((v) => !v)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showRegisterPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <p className={"text-xs " + (registerPasswordWeak ? "text-red-600" : "text-muted-foreground")}>A senha deve ter pelo menos 6 caracteres, 1 letra maiúscula, 1 número e 1 caractere especial.</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password2Confirm">Confirmar senha</Label>
                  <div className="relative">
                    <Input
                      id="password2Confirm"
                      type={showRegisterConfirm ? "text" : "password"}
                      placeholder="••••••••"
                      value={registerConfirm}
                      onChange={(e) => setRegisterConfirm(e.target.value)}
                    />
                    <button
                      type="button"
                      aria-label={showRegisterConfirm ? "Ocultar senha" : "Mostrar senha"}
                      onClick={() => setShowRegisterConfirm((v) => !v)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showRegisterConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {passwordsMismatch && (
                    <p className="text-sm text-red-600">As senhas não coincidem</p>
                  )}
                </div>
                <Button
                  type="button"
                  className="w-full"
                  disabled={passwordsMismatch || registerPasswordWeak || !isValidEmail(registerEmail)}
                  onClick={() => {
                    if (!isValidEmail(registerEmail)) {
                      setRegisterEmailError("Informe um email válido");
                      return;
                    }
                    if (!isStrongPassword(registerPassword)) {
                      // Apenas garante feedback visual pela linha acima
                      return;
                    }
                    // implementar ação de cadastro aqui
                  }}
                >
                  Criar conta
                </Button>
              </form>
              <div className="my-4 text-center text-xs text-muted-foreground">ou</div>
              <div className="grid grid-cols-1 gap-3">
                <Button type="button" variant="outline" className="w-full">
                  <img src="/google.png" alt="Google" className="w-5 h-5 object-contain rounded-sm" />
                  Continuar com Google
                </Button>
                <Button type="button" variant="outline" className="w-full">
                  <img src="/facebook.png" alt="Facebook" className="w-5 h-5 object-contain rounded-sm" />
                  Continuar com Facebook
                </Button>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-6 text-center text-sm">
            <Link to="/" className="text-blue-600 hover:underline">Voltar para a Home</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;


