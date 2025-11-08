{ pkgs }: {
  deps = [
    pkgs.nodejs_18
    pkgs.nodePackages.npm
    pkgs.nodePackages.npx
    pkgs.git
    pkgs.cacert
    pkgs.watchman
  ];
}
