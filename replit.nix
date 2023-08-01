{ pkgs }: {
    deps = [
        pkgs.nodejs-16_x
        pkgs.speedtest_cli
        pkgs.yarn
        pkgs.arcan.ffmpeg
        pkgs.openssh_with_kerberos
        pkgs.nodePackages.typescript
        pkgs.nodePackages.pm2
        pkgs.imagemagick
        pkgs.libwebp
        pkgs.git
        pkgs.python2
        pkgs.python310Packages.python
        pkgs.libuuid
    ];
    env = {
        LD_LIBRARY_PATH = pkgs.lib.makeLibraryPath [
            pkgs.libuuid
        ];
    };
}
