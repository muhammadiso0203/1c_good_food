import { useState } from "react";
import { useNavigate } from "react-router";
// import { useLogin } from "./service/useLogin";
import { toast } from "sonner";

import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Eye, EyeOff, LockKeyhole, User2 } from "lucide-react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

//   const { mutate, isPending } = useLogin();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      toast.warning("Iltimos, barcha maydonlarni to'ldiring");
      return;
    }

    // mutate(
    //   { username, password },
    //   {
    //     onSuccess: () => {
    //       toast.success("Muvaffaqiyatli tizimga kirdingiz", {
    //         position: "top-right"
    //       });
    //       navigate("/admin/dashboard");
    //     },
    //     onError: (error: any) => {
    //       // Backenddan kelgan xatolik xabari yoki umumiy xabar
    //       const errorMsg =
    //         error.response?.data?.message?.uz || "Login yoki parol noto'g'ri!";

    //       toast.error("Kirishda xatolik!", {
    //         description: errorMsg,
    //         duration: 4000, 
    //       });
    //     },
    //   }
    // );
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-[#020817] p-4">
      <Card className="w-full max-w-100 border-none rounded-[24px] overflow-hidden">
        <CardHeader className="pt-10 pb-6 text-center space-y-4">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-white">
            <LockKeyhole className="h-7 w-7" />
          </div>
          <div className="space-y-1.5">
            <CardTitle className="text-2xl font-bold tracking-tight">
              Admin Panel
            </CardTitle>
            <CardDescription className="text-slate-500 font-medium">
              Tizimga kirish uchun ma'lumotlarni kiriting
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="px-8 pb-8">
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2.5">
              <Label
                htmlFor="username"
                className="text-[13px] font-semibold text-slate-700 ml-1"
              >
                Foydalanuvchi nomi
              </Label>
              <div className="relative group">
                <User2 className="absolute left-4 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-slate-400 group-focus-within:text-slate-900 transition-colors" />
                <Input
                  id="username"
                  placeholder="admin_user"
                  className="h-12 pl-11 bg-slate-50/50 border-slate-200 focus-visible:ring-1 focus-visible:ring-slate-400 rounded-xl"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2.5">
              <Label
                htmlFor="password"
                className="text-[13px] font-semibold text-slate-700 ml-1"
              >
                Parol
              </Label>
              <div className="relative group">
                <LockKeyhole className="absolute left-4 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-slate-400 group-focus-within:text-slate-900 transition-colors" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="h-12 pl-11 pr-11 bg-slate-50/50 border-slate-200 focus-visible:ring-1 focus-visible:ring-slate-400 rounded-xl"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-4.5 w-4.5" />
                  ) : (
                    <Eye className="h-4.5 w-4.5" />
                  )}
                </button>
              </div>
            </div>

            <Button
            onClick={() => navigate('/main-layout')}
              type="submit"
            //   disabled={isPending}
              className="w-full h-12 mt-2 bg-slate-900 hover:bg-black text-white font-bold rounded-xl active:scale-[0.98] transition-all"
            >
              {/* {isPending ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : ( */}
                Tizimga kirish
              {/* )} */}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="bg-slate-50/80 py-4 border-t border-slate-100">
          <p className="w-full text-center text-[10px] uppercase tracking-[2px] font-bold text-slate-400">
            Xavfsiz tizim boshqaruvi &copy; 2026
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;