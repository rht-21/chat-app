import { useAuthStore } from "@/store/useAuthStore";
import { IconLogout, IconMessage2Bolt } from "@tabler/icons-react";

const Navbar = () => {
  const { logout } = useAuthStore();

  return (
    <nav className="flex items-center justify-between p-4 sm:px-6 md:px-8">
      <div className="flex items-center gap-2">
        <IconMessage2Bolt stroke={1.5} />
        <h2 className="text-xl font-medium">ChatzApp</h2>
      </div>
      <div className="flex items-center gap-4">
        <span
          onClick={logout}
          className="flex items-center gap-2 cursor-pointer"
        >
          Logout <IconLogout size={16} stroke={1.5} />
        </span>
      </div>
    </nav>
  );
};

export default Navbar;
