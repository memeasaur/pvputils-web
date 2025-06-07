import JSZip from "jszip";
import {PackUpdateWorkerRequest, PackUpdateWorkerResponse} from './types';

const OLD_ITEMS_PATH = "assets/minecraft/textures/items/"
const NEW_ITEMS_PATH = "assets/minecraft/textures/item/"
const OLD_BLOCKS_PATH = "assets/minecraft/textures/blocks/"
const NEW_BLOCKS_PATH = "assets/minecraft/textures/block/"
const NEW_POTION_PATH = NEW_ITEMS_PATH + "potion"
const replacements = Object.freeze({
    [OLD_ITEMS_PATH + "potion_bottle_splash.png"]: NEW_ITEMS_PATH + "splash_potion.png",
    [OLD_ITEMS_PATH + "potion_bottle_drinkable.png"]: NEW_POTION_PATH,
    [OLD_ITEMS_PATH + "apple_golden.png"]: NEW_ITEMS_PATH + "golden_apple.png",
    [OLD_ITEMS_PATH + "bow_standby.png"]: NEW_ITEMS_PATH + "bow.png",
    [OLD_ITEMS_PATH + "beef_raw.png"]: NEW_ITEMS_PATH + "beef.png",
    [OLD_ITEMS_PATH + "chicken_raw.png"]: NEW_ITEMS_PATH + "chicken.png",
    [OLD_ITEMS_PATH + "porkchop_raw.png"]: NEW_ITEMS_PATH + "porkchop.png",
    [OLD_ITEMS_PATH + "bucket_empty.png"]: NEW_ITEMS_PATH + "bucket.png",
    [OLD_ITEMS_PATH + "bucket_water.png"]: NEW_ITEMS_PATH + "water_bucket.png",
    [OLD_ITEMS_PATH + "bucket_lava.png"]: NEW_ITEMS_PATH + "lava_bucket.png",
    [OLD_ITEMS_PATH + "bucket_milk.png"]: NEW_ITEMS_PATH + "milk_bucket.png",
    [OLD_ITEMS_PATH + "chicken_cooked.png"]: NEW_ITEMS_PATH + "cooked_chicken.png",
    [OLD_ITEMS_PATH + "beef_cooked.png"]: NEW_ITEMS_PATH + "cooked_beef.png",
    [OLD_ITEMS_PATH + "porkchop_cooked.png"]: NEW_ITEMS_PATH + "cooked_porkchop.png",
    [OLD_ITEMS_PATH + "fireworks.png"]: NEW_ITEMS_PATH + "firework_rocket.png",
    [OLD_ITEMS_PATH + "melon_speckled.png"]: NEW_ITEMS_PATH + "glistering_melon_slice.png",
    [OLD_ITEMS_PATH + "melon.png"]: NEW_ITEMS_PATH + "melon_slice.png",

    [OLD_BLOCKS_PATH + "fire_layer_0.png"]: NEW_BLOCKS_PATH + "fire_0.png",
    [OLD_BLOCKS_PATH + "fire_layer_1.png"]: NEW_BLOCKS_PATH + "fire_1.png",
    [OLD_BLOCKS_PATH + "fire_layer_0.png.mcmeta"]: NEW_BLOCKS_PATH + "fire_0.png.mcmeta",
    [OLD_BLOCKS_PATH + "fire_layer_1.png.mcmeta"]: NEW_BLOCKS_PATH + "fire_1.png.mcmeta",
    [OLD_BLOCKS_PATH + "grass_side.png"]: NEW_BLOCKS_PATH + "grass_block_side.png",
    [OLD_BLOCKS_PATH + "grass_top.png"]: NEW_BLOCKS_PATH + "grass_block_top.png",
    [OLD_BLOCKS_PATH + "grass_side_overlay.png"]: NEW_BLOCKS_PATH + "grass_block_side_overlay.png",
    [OLD_BLOCKS_PATH + "grass_side_snowed.png"]: NEW_BLOCKS_PATH + "grass_block_snowed.png",
    [OLD_BLOCKS_PATH + "log_oak.png"]: NEW_BLOCKS_PATH + "oak_log.png",
    [OLD_BLOCKS_PATH + "log_birch.png"]: NEW_BLOCKS_PATH + "birch_log.png",
    [OLD_BLOCKS_PATH + "log_jungle.png"]: NEW_BLOCKS_PATH + "jungle_log.png",
    [OLD_BLOCKS_PATH + "log_spruce.png"]: NEW_BLOCKS_PATH + "spruce_log.png",
    [OLD_BLOCKS_PATH + "planks_oak.png"]: NEW_BLOCKS_PATH + "oak_planks.png",
    [OLD_BLOCKS_PATH + "planks_birch.png"]: NEW_BLOCKS_PATH + "birch_planks.png",
    [OLD_BLOCKS_PATH + "planks_jungle.png"]: NEW_BLOCKS_PATH + "jungle_planks.png",
    [OLD_BLOCKS_PATH + "planks_spruce.png"]: NEW_BLOCKS_PATH + "spruce_planks.png",
    [OLD_BLOCKS_PATH + "nether_brick.png"]: NEW_BLOCKS_PATH + "nether_bricks.png",
    [OLD_BLOCKS_PATH + "sandstone_normal.png"]: NEW_BLOCKS_PATH + "sandstone.png",
    [OLD_BLOCKS_PATH + "stone_slab_top.png"]: NEW_BLOCKS_PATH + "smooth_stone.png",
    [OLD_BLOCKS_PATH + "stone_slab_side.png"]: NEW_BLOCKS_PATH + "smooth_stone_slab.png",
    [OLD_BLOCKS_PATH + "stonebrick.png"]: NEW_BLOCKS_PATH + "stone_bricks.png",

    [OLD_BLOCKS_PATH + "wool_colored_black.png"]: NEW_BLOCKS_PATH + "black_wool.png",
    [OLD_BLOCKS_PATH + "wool_colored_blue.png"]: NEW_BLOCKS_PATH + "blue_wool.png",
    [OLD_BLOCKS_PATH + "wool_colored_brown.png"]: NEW_BLOCKS_PATH + "brown_wool.png",
    [OLD_BLOCKS_PATH + "wool_colored_cyan.png"]: NEW_BLOCKS_PATH + "cyan_wool.png",
    [OLD_BLOCKS_PATH + "wool_colored_gray.png"]: NEW_BLOCKS_PATH + "gray_wool.png",
    [OLD_BLOCKS_PATH + "wool_colored_green.png"]: NEW_BLOCKS_PATH + "green_wool.png",
    [OLD_BLOCKS_PATH + "wool_colored_light_blue.png"]: NEW_BLOCKS_PATH + "light_blue_wool.png",
    [OLD_BLOCKS_PATH + "wool_colored_lime.png"]: NEW_BLOCKS_PATH + "lime_wool.png",
    [OLD_BLOCKS_PATH + "wool_colored_magenta.png"]: NEW_BLOCKS_PATH + "magenta_wool.png",
    [OLD_BLOCKS_PATH + "wool_colored_orange.png"]: NEW_BLOCKS_PATH + "orange_wool.png",
    [OLD_BLOCKS_PATH + "wool_colored_pink.png"]: NEW_BLOCKS_PATH + "pink_wool.png",
    [OLD_BLOCKS_PATH + "wool_colored_purple.png"]: NEW_BLOCKS_PATH + "purple_wool.png",
    [OLD_BLOCKS_PATH + "wool_colored_red.png"]: NEW_BLOCKS_PATH + "red_wool.png",
    [OLD_BLOCKS_PATH + "wool_colored_light_gray.png"]: NEW_BLOCKS_PATH + "light_gray_wool.png",
    [OLD_BLOCKS_PATH + "wool_colored_white.png"]: NEW_BLOCKS_PATH + "white_wool.png",
    [OLD_BLOCKS_PATH + "wool_colored_yellow.png"]: NEW_BLOCKS_PATH + "yellow_wool.png",

    [OLD_BLOCKS_PATH + "hardened_clay.png"]: NEW_BLOCKS_PATH + "terracotta.png",
    [OLD_BLOCKS_PATH + "hardened_clay_stained_black.png"]: NEW_BLOCKS_PATH + "black_terracotta.png",
    [OLD_BLOCKS_PATH + "hardened_clay_stained_blue.png"]: NEW_BLOCKS_PATH + "blue_terracotta.png",
    [OLD_BLOCKS_PATH + "hardened_clay_stained_brown.png"]: NEW_BLOCKS_PATH + "brown_terracotta.png",
    [OLD_BLOCKS_PATH + "hardened_clay_stained_cyan.png"]: NEW_BLOCKS_PATH + "cyan_terracotta.png",
    [OLD_BLOCKS_PATH + "hardened_clay_stained_gray.png"]: NEW_BLOCKS_PATH + "gray_terracotta.png",
    [OLD_BLOCKS_PATH + "hardened_clay_stained_green.png"]: NEW_BLOCKS_PATH + "green_terracotta.png",
    [OLD_BLOCKS_PATH + "hardened_clay_stained_light_blue.png"]: NEW_BLOCKS_PATH + "light_blue_terracotta.png",
    [OLD_BLOCKS_PATH + "hardened_clay_stained_lime.png"]: NEW_BLOCKS_PATH + "lime_terracotta.png",
    [OLD_BLOCKS_PATH + "hardened_clay_stained_magenta.png"]: NEW_BLOCKS_PATH + "magenta_terracotta.png",
    [OLD_BLOCKS_PATH + "hardened_clay_stained_orange.png"]: NEW_BLOCKS_PATH + "orange_terracotta.png",
    [OLD_BLOCKS_PATH + "hardened_clay_stained_pink.png"]: NEW_BLOCKS_PATH + "pink_terracotta.png",
    [OLD_BLOCKS_PATH + "hardened_clay_stained_purple.png"]: NEW_BLOCKS_PATH + "purple_terracotta.png",
    [OLD_BLOCKS_PATH + "hardened_clay_stained_red.png"]: NEW_BLOCKS_PATH + "red_terracotta.png",
    [OLD_BLOCKS_PATH + "hardened_clay_stained_light_gray.png"]: NEW_BLOCKS_PATH + "light_gray_terracotta.png",
    [OLD_BLOCKS_PATH + "hardened_clay_stained_white.png"]: NEW_BLOCKS_PATH + "white_terracotta.png",
    [OLD_BLOCKS_PATH + "hardened_clay_stained_yellow.png"]: NEW_BLOCKS_PATH + "yellow_terracotta.png",
})
const NEW_HUD_SPRITES_PATH = "assets/minecraft/textures/gui/sprites/hud/"
const NEW_WIDGET_SPRITES_PATH = "assets/minecraft/textures/gui/sprites/widget/"

self.onmessage = async (e: MessageEvent<PackUpdateWorkerRequest>) => {
    const data = e.data
    const updatedPack = await new JSZip().loadAsync(data.pack);
    await Promise.all(Object.entries(updatedPack.files) // TODO -> apparently object.entries is safely capturing a snapshot of the files, so mutating it is fine
        .map(async ([oldFilename, file]) => {
            // TODO -> progress bar
            // TODO -> progress console

            switch (oldFilename) {
                case "assets/minecraft/textures/gui/icons.png": {
                    const spriteSheet = await createImageBitmap(await file.async("blob"))
                    const resolutionFactor = spriteSheet.height / 512
                    await Promise.all([
                        handleSpriteTarget(15, resolutionFactor, 15, spriteSheet, 0, 0, updatedPack, NEW_HUD_SPRITES_PATH + "crosshair.png"),
                        handleSpriteTarget(128, resolutionFactor, 5, spriteSheet, 0, 64, updatedPack, NEW_HUD_SPRITES_PATH + "experience_bar_background.png"),
                        handleSpriteTarget(128, resolutionFactor, 5, spriteSheet, 0, 69, updatedPack, NEW_HUD_SPRITES_PATH + "experience_bar_progress.png"),
                        handleSpriteTarget(128, resolutionFactor, 5, spriteSheet, 0, 74, updatedPack, NEW_HUD_SPRITES_PATH + "jump_bar_cooldown.png"),
                        handleSpriteTarget(128, resolutionFactor, 5, spriteSheet, 0, 74, updatedPack, "assets/minecraft/textures/gui/sprites/boss_bar/pink_background.png"),
                        handleSpriteTarget(128, resolutionFactor, 5, spriteSheet, 0, 79, updatedPack, "assets/minecraft/textures/gui/sprites/boss_bar/pink_progress.png"),
                        // TODO -> recolor the pink progress bar and make the other colors
                        handleSpriteTarget(128, resolutionFactor, 5, spriteSheet, 0, 84, updatedPack, NEW_HUD_SPRITES_PATH + "jump_bar_background.png"),
                        handleSpriteTarget(128, resolutionFactor, 5, spriteSheet, 0, 89, updatedPack, NEW_HUD_SPRITES_PATH + "jump_bar_progress.png")
                    ])
                    {
                        const canvas = new OffscreenCanvas(162 * resolutionFactor, 54 * resolutionFactor)
                        const context = canvas.getContext("2d");
                        if (context) {
                            const futureSprites = getSpriteTargetBlobPromises(spriteSheet, 9 * resolutionFactor, context, canvas)
                            function handleHeart(y: number, x: number, newName: string) {
                                return handleSpriteIteration(futureSprites, y, x, updatedPack, "assets/minecraft/textures/gui/sprites/hud/heart/" + newName + ".png")
                            }
                            function handleHud(y: number, x: number, newName: string) {
                                return handleSpriteIteration(futureSprites, y, x, updatedPack, NEW_HUD_SPRITES_PATH + newName + ".png")
                            }
                            await handleHeart(0, 0, "container")
                            await handleHeart(0, 1, "container_blinking")
                            // await handleHeart(0, 2, "container")
                            // await handleHeart(0, 3, "container") TODO (?) unused?
                            await handleHeart(0, 4, "full")
                            await handleHeart(0, 5, "half")
                            await handleHeart(0, 6, "full_blinking")
                            await handleHeart(0, 7, "half_blinking")
                            await handleHeart(0, 8, "poisoned_full")
                            await handleHeart(0, 9, "poisoned_half")
                            await handleHeart(0, 10, "poisoned_full_blinking")
                            await handleHeart(0, 11, "poisoned_half_blinking")
                            await handleHeart(0, 12, "withered_full")
                            await handleHeart(0, 13, "withered_half")
                            await handleHeart(0, 14, "withered_full_blinking")
                            await handleHeart(0, 15, "withered_half_blinking") // TODO
                            await handleHeart(0, 16, "absorbing_full")
                            await handleHeart(0, 17, "absorbing_half")
                            // TODO -> toggle for blinking hearts + handling absorbing blinking full and absorbing blinking half

                            await handleHud(1, 0, "armor_empty")
                            await handleHud(1, 1, "armor_half")
                            await handleHud(1, 2, "armor_full")
                            // await handleHeart(1, 3, "absorbing_full") // TODO -> not sure which of these is actually used in 1.7, doesn't really matter I guess
                            await handleHeart(1, 4, "vehicle_container")
                            // await handleHeart(1, 5, "absorbing_full") TODO -> vehicle container blinking just isn't in and this game is an inconsistent piece of shit?
                            // await handleHeart(1, 6, "absorbing_full")
                            // await handleHeart(1, 7, "absorbing_full")
                            await handleHeart(1, 8, "vehicle_full")
                            await handleHeart(1, 9, "vehicle_half")
                            // await handleHeart(1, 10, "absorbing_full")
                            // await handleHeart(1, 11, "absorbing_full") TODO seems so

                            await handleHud(2, 0, "air")
                            await handleHud(2, 1, "air_bursting")

                            await handleHud(3, 0, "food_empty")
                            // await handleHud(3, 1, "absorbing_full")
                            // await handleHud(3, 2, "absorbing_full")
                            // await handleHud(3, 3, "absorbing_full")
                            await handleHud(3, 4, "food_full")
                            await handleHud(3, 5, "food_half")
                            // await handleHud(3, 6, "absorbing_full")
                            // await handleHud(3, 7, "absorbing_full")
                            await handleHud(3, 8, "food_full_hunger")
                            await handleHud(3, 9, "food_half_hunger")
                            // await handleHud(3, 10, "absorbing_full")
                            // await handleHud(3, 11, "absorbing_full")
                            // await handleHud(3, 12, "absorbing_full")

                            // await handleHud(4, 0, "food_empty_hunger")

                            await handleHeart(5, 0, "container_hardcore")
                            await handleHeart(5, 1, "container_hardcore_blinking")
                            // await handleHeart(5, 2, "absorbing_full")
                            // await handleHeart(5, 3, "absorbing_full")
                            await handleHeart(5, 4, "hardcore_full")
                            await handleHeart(5, 5, "hardcore_half")
                            await handleHeart(5, 6, "hardcore_full_blinking") // TODO
                            await handleHeart(5, 7, "hardcore_half_blinking")
                            await handleHeart(5, 8, "poisoned_hardcore_full")
                            await handleHeart(5, 9, "poisoned_hardcore_half")
                            await handleHeart(5, 10, "poisoned_hardcore_full_blinking") // TODO
                            await handleHeart(5, 11, "poisoned_hardcore_half_blinking")
                            await handleHeart(5, 12, "withered_hardcore_full")
                            await handleHeart(5, 13, "withered_hardcore_half")
                            await handleHeart(5, 14, "withered_hardcore_full_blinking") // TODO
                            await handleHeart(5, 15, "withered_hardcore_half_blinking")
                            await handleHeart(5, 16, "absorbing_hardcore_full")
                            await handleHeart(5, 17, "absorbing_hardcore_half")
                            // TODO -> toggle for blinking hearts + handling absorbing blinking full and absorbing blinking half
                        }
                    }
                    break
                }
                case "assets/minecraft/textures/gui/widgets.png": {
                    const spriteSheet = await createImageBitmap(await file.async("blob"))
                    const resolutionFactor = spriteSheet.height / 512
                    await Promise.all([
                        handleSpriteTarget(182, resolutionFactor, 22, spriteSheet, 0, 0, updatedPack, NEW_HUD_SPRITES_PATH + "hotbar.png"),
                        handleSpriteTarget(22, resolutionFactor, 22, spriteSheet, 0, 22, updatedPack, NEW_HUD_SPRITES_PATH + "hotbar_selection.png"),
                        handleSpriteTarget(200, resolutionFactor, 20, spriteSheet, 0, 46, updatedPack, NEW_WIDGET_SPRITES_PATH + "button_disabled.png"),
                        handleSpriteTarget(200, resolutionFactor, 20, spriteSheet, 0, 66, updatedPack, NEW_WIDGET_SPRITES_PATH + "button_highlighted.png"),
                        handleSpriteTarget(200, resolutionFactor, 20, spriteSheet, 0, 86, updatedPack, NEW_WIDGET_SPRITES_PATH + "button.png")
                    ])
                    break
                }
                case "assets/minecraft/textures/particle/particles.png": {
                    const spriteSheet = await createImageBitmap(await file.async("blob"));
                    const spriteSize = spriteSheet.height / 16;
                    const canvas = new OffscreenCanvas(spriteSize, spriteSize)
                    const context = canvas.getContext("2d")
                    if (context) {
                        const sprites = getSpriteTargetBlobPromises(spriteSheet, spriteSize, context, canvas)
                        function handle(y: number, x: number, newName: string) {
                            return handleSpriteIteration(sprites, y, x, updatedPack, "assets/minecraft/textures/particle/" + newName + ".png")
                        }
                        await Promise.all([
                            handle(0, 0, "big_smoke_0"),
                            handle(0, 1, "big_smoke_1"),
                            handle(0, 2, "big_smoke_2"),
                            handle(0, 3, "big_smoke_3"),
                            handle(0, 4, "big_smoke_4"),
                            handle(0, 5, "big_smoke_5"),
                            handle(0, 6, "big_smoke_6"),
                            handle(0, 7, "big_smoke_8"),
                            handle(0, 8, "big_smoke_9"),
                            handle(0, 9, "big_smoke_10"),
                            handle(0, 10, "big_smoke_11"),
                            handle(1, 0, "splash_0"),
                            handle(1, 4, "splash_1"),
                            handle(1, 5, "splash_2"),
                            handle(1, 6, "splash_3"),
                            handle(2, 0, "bubble"),

                            async () => {
                                const fishingHook = await sprites[2][1]
                                if (fishingHook)
                                    updatedPack.file("assets/minecraft/textures/entity/fishing_hook.png", fishingHook)
                            },

                            handle(3, 0, "flame"),
                            handle(3, 1, "lava"),
                            handle(4, 0, "note"),
                            handle(4, 1, "critical_hit"),
                            handle(4, 2, "enchanted_hit"),
                            handle(5, 0, "heart"),
                            handle(5, 1, "angry"),
                            handle(5, 2, "glint"),
                            // handleSpriteIteration(5, 3, ) TODO (?) remove, it's the villager particle which probably is just removed
                            // handleSpriteIteration(6, 0, )
                            // handleSpriteIteration(6, 1) // TODO -> blue soul speed lookin shit ? no clue
                            handle(7, 0, "drip_hang"),
                            handle(7, 1, "drip_fall"),
                            handle(7, 2, "drip_land"),
                            handle(8, 0, "effect_0"),
                            handle(8, 1, "effect_1"),
                            handle(8, 2, "effect_2"),
                            handle(8, 3, "effect_3"),
                            handle(8, 4, "effect_4"),
                            handle(8, 5, "effect_5"),
                            handle(8, 6, "effect_6"),
                            handle(8, 7, "effect_7"),
                            handle(9, 0, "spell_0"),
                            handle(9, 1, "spell_1"),
                            handle(9, 2, "spell_2"),
                            handle(9, 3, "spell_3"),
                            handle(9, 4, "spell_4"),
                            handle(9, 5, "spell_5"),
                            handle(9, 6, "spell_6"),
                            handle(9, 7, "spell_7"),

                            handle(14, 1, "sga_a"),
                            handle(14, 2, "sga_b"),
                            handle(14, 3, "sga_c"),
                            handle(14, 4, "sga_d"),
                            handle(14, 5, "sga_e"),
                            handle(14, 6, "sga_f"),
                            handle(14, 7, "sga_g"),
                            handle(14, 8, "sga_h"),
                            handle(14, 9, "sga_i"),
                            handle(14, 10, "sga_j"),
                            handle(14, 11, "sga_k"),
                            handle(14, 12, "sga_l"),
                            handle(14, 13, "sga_m"),
                            handle(14, 14, "sga_n"),
                            handle(14, 15, "sga_o"),
                            handle(15, 0, "sga_p"),
                            handle(15, 1, "sga_q"),
                            handle(15, 2, "sga_r"),
                            handle(15, 3, "sga_s"),
                            handle(15, 4, "sga_t"),
                            handle(15, 5, "sga_u"),
                            handle(15, 6, "sga_v"),
                            handle(15, 7, "sga_w"),
                            handle(15, 8, "sga_x"),
                            handle(15, 9, "sga_y"),
                            handle(15, 10, "sga_z")
                        ])

                        updatedPack.remove(oldFilename) // TODO -> backwards compatiblity
                    }
                    break
                }
                default: {
                    const newFilename = (replacements[oldFilename] || oldFilename)
                        .replace(OLD_BLOCKS_PATH, NEW_BLOCKS_PATH)
                        .replace(OLD_ITEMS_PATH, NEW_ITEMS_PATH)

                    if (oldFilename !== newFilename) {
                        const content = file.dir
                            ? null
                            : newFilename === "pack.mcmeta"
                                ? (await file.async("string"))
                                    // .replace() TODO
                                    .replace('"pack_format": 1', '"pack_format": 43')
                                : await file.async("uint8array")

                        if (newFilename === NEW_POTION_PATH && content !== null) // TODO -> this is specific to 1.7
                            updatedPack.file(NEW_ITEMS_PATH + "glass_bottle", content)

                        // TODO -> option for maintaining backwards compatibility
                        updatedPack.remove(oldFilename)

                        if (content === null) // TODO PRETTY SURE THIS IS SAFELY MUTATING UPDATED PACK BECAUSE JAVASCRIPT SINGLE THREADED EVENT LOOP!
                            updatedPack.folder(newFilename);
                        else
                            updatedPack.file(newFilename, content);
                    }
                }
            }
        }))
    self.postMessage({
        updatedPack: await updatedPack.generateAsync({type: "blob"}),
        updatedPackName: data.packName
    } as PackUpdateWorkerResponse);
}

async function handleSpriteTarget(width: number, resolutionFactor: number, height: number, spriteSheet: ImageBitmap, x: number, y: number, updatedPack: JSZip, filename: string) {
    const canvas = new OffscreenCanvas(width * resolutionFactor, height * resolutionFactor)
    const context = canvas.getContext("2d");
    if (context) {
        context.drawImage(spriteSheet, x, y, canvas.width, canvas.height);
        const hotbar = await canvas.convertToBlob({ type: "image/png" })
        if (hotbar)
            updatedPack.file(filename, hotbar)
    }
}
function getSpriteTargetBlobPromises(spriteSheet: ImageBitmap, spriteSize: number, context: OffscreenCanvasRenderingContext2D, canvas: OffscreenCanvas) {
    // TODO -> stream this (?)
    const sprites: (Promise<Blob | null>)[][] = [];
    for (let row = 0; row < spriteSheet.height / spriteSize; row++) {
        sprites[row] = [];
        for (let col = 0; col < spriteSheet.width / spriteSize; col++) {
            context.clearRect(0, 0, spriteSize, spriteSize);
            context.drawImage(spriteSheet, col * spriteSize, row * spriteSize, spriteSize, spriteSize);

            sprites[row][col] = canvas.convertToBlob({ type: "image/png" })
        }
    }
    return sprites
}
async function handleSpriteIteration(futureSprites: (Promise<Blob | null>)[][], y: number, x: number, updatedPack: JSZip, newFilename: string) {
    const sprite = await futureSprites[y][x]
    if (sprite)
        updatedPack.file(newFilename, sprite)
}
export {}