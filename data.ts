export const MOD_DATA = [
    {
        "version": 0.9,
        "summary": "init",
        "is_critical": false,
        "minecraft_versions": "1.21.4",
        "nullable_dependencies": ["fabric api"],
        "markdown": `8/22/25 v0.9 - init

|                                                                                                                                                                                                                                   |
|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 1. remove 1.8's .5s missed hit penalty cooldown, unless server disallows it                                                                                                                                                       |
| 2. toggle movement keybinds (autorun), with 1.7 hcf-style toggle-sprint/toggle-sneak/server disallowable fly-boost. (autorun works in menus), and (toggle-sneak works in both inventories and menus) unless server disallows them |
| 3. customizable fake night vision-style fullbright                                                                                                                                                                                |
| 4. customizable last attack reach indicator                                                                                                                                                                                       |
| 5. in-depth player nameplate color changer system                                                                                                                                                                                 |
| 6. customizable sweep hit warning sound effect                                                                                                                                                                                    |
| 7. customizable knockback/sweep/generic hit particles                                                                                                                                                                             |
| 8. toggleable potion enchantment glint revert (1.8)                                                                                                                                                                               |
| 9. reverted ability to use items while breaking blocks                                                                                                                                                                            |

| 1.9 combat                                                 | 1.8 combat                                                |
|------------------------------------------------------------|-----------------------------------------------------------|
| 10. customizable attack cooldown notification sound effect | 10. disable vanilla attack-hand lowering animation option |
| 11. customizable attack cooldown warning sound effect      | 11. toggleable reverted sharpness/crit particles          |
| 12. customizable last attack cooldown indicator            |                                                           |

| dependencies                                      |
|---------------------------------------------------|
| [fabric api](https://modrinth.com/mod/fabric-api) |`
    }
]
export const UPDATER_DATA = [
    {
        version: 0.9,
        created_at: "2025-08-22 21:59:47.331566+00",
        summary: "init",
        generic_patchnotes: [
            "update mojang's arbitrarily changed .png filenames",
            "split particles.png, icons.png, and widgets.png into modern-compliant sprites",
            "update inventory.png",
            "update pack.mcmeta's pack version",
            "update enchantment glint's .png",
            "miscellaneous pack conversion config options",
            "fix blur on textures"
        ]
    }
]