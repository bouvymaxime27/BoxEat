# replit.nix (minimal et 100% compatible Replit)
{ pkgs }: {
  deps = [
    pkgs.nodejs-20_x      # si cette ligne échoue, remplace par pkgs.nodejs-18_x
    pkgs.nodePackages.npm
    pkgs.watchman
    pkgs.cacert
    pkgs.git
  ];
}
