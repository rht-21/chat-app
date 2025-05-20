const HomeScreen = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-neutral-950">
      <div className="max-w-md text-center space-y-6">
        <h2 className="text-2xl font-medium">Welcome to ChatzApp!</h2>
        <p className="text-neutral-300">
          Select a conversation or search to start chatting
        </p>
      </div>
    </div>
  );
};

export default HomeScreen;
