import { db } from "./db";

export const findUserById = async(id: string) => {
    const { data, error } = await db
        .from("creators")
        .select("id, fullname, email, username, dp, titles, website, bio, private, ghost, verified, gender, country, tel, birthday, interests, language, location")
        .eq("id", id)
        .single()

    if (error) {
        console.log(error);
        return false;
    }

    return data;
}

export const findUserByNick = async(username: string, password: string) => {
    const { data, error } = await db
        .from("creators")
        .select("id, fullname, email, username, dp, titles, website, bio, private, ghost, verified, gender, country, tel, birthday, interests, language, location")
        .eq("username", username)
        .eq("password", password)
        .single()

    if (error) {
        console.log(error);
        return false;
    }

    return data;
}

export const checkEmailExists = async(email: string) => {
    const { data, error } = await db
        .from("creators")
        .select("email")
        .eq("email", email)
        .single()

    if (error) {
        console.log(error);
        return false;
    }

    return !!data;
}

export const checkPassword = async(id: string, password: string) => {
    const { data, error } = await db
        .from("creators")
        .select("username")
        .eq("id", id)
        .eq("password", password)
        .single()

    if (error) {
        console.log(error);
        return false;
    }

    return !!data;
}

export const updatePassword = async(password: string, creator: string) => {
    try {
        const { data, error } = await db
        .from('creators')
        .update({ password: `${password}` })
        .eq('id', `${creator}`)
        .select()

        if (error) {
            console.log(error);
            return false;
        }

        return !!data;
    } catch (error) {
        console.log(error);
    }
}

export const checkUsernameExists = async(username: string) => {
    const { data, error } = await db
        .from("creators")
        .select("username")
        .eq("username", username)
        .single()

    if (error) {
        console.log(error);
        return false;
    }

    return !!data;
}

export const addUser = async({ username, email, password, interests, address, key, accumulation }: { username: string, email: string, password: string, interests?: Array<string>, address: string, key: string, accumulation: number }) => {
    try {
        const { data, error } = await db
            .from("creators")
            .insert({ username, email, password, interests, address, key, accumulation })
            .select("id, username, email")
            .single()

        if (error) {
            console.log(error);
            return false;
        }

        return data;
    } catch (error) {
        console.log(error);
    }
}

export const uploadDp = async(path: string, file: any, ext: string) => {
    const { data, error } = await db.storage.from('social').upload(path, file, { contentType: `image/${ext}`, upsert: false })
    if (error) {
      console.log(error.message);
      return;
    } else {
      return data;
    }
}

export const removeDp = async(file: string) => {
    const { data, error } = await db.storage.from('social').remove([file])

    if (error) {
      console.log(error.message);
      return;
    } else {
      return data;
    }
}

export const updateUserDp = async(pix: string, creator: string) => {
    try {
        const { data, error } = await db
        .from('creators')
        .update({ dp: `${pix}` })
        .eq('id', `${creator}`)
        .select()

        if (error) {
            console.log(error);
            return false;
        }

        return !!data;
    } catch (error) {
        console.log(error);
    }
}

export const updateUser = async(userdata: { fullname: string, username: string, website: string, bio: string, gender: string }, creator: string) => {
    try {
        const { data, error } = await db
        .from('creators')
        .update(userdata)
        .eq('id', `${creator}`)
        .select()

        if (error) {
            console.log(error);
            return false;
        }

        return !!data;
    } catch (error) {
        console.log(error);
    }
}

export const updateUserCountry = async(place: string, creator: string) => {
    try {
        const { data, error } = await db
        .from('creators')
        .update({ country: place })
        .eq('id', `${creator}`)
        .select()

        if (error) {
            console.log(error);
            return false;
        }

        return !!data;
    } catch (error) {
        console.log(error);
    }
}

export const updateUserInterest = async(list: Array<string>, creator: string) => {
    try {
        const { data, error } = await db
        .from('creators')
        .update({ interests: list })
        .eq('id', `${creator}`)
        .select()

        if (error) {
            console.log(error);
            return false;
        }

        return !!data;
    } catch (error) {
        console.log(error);
    }
}

export const updateUserTitles = async(list: Array<string>, creator: string) => {
    try {
        const { data, error } = await db
        .from('creators')
        .update({ titles: list })
        .eq('id', `${creator}`)
        .select()

        if (error) {
            console.log(error);
            return false;
        }

        return !!data;
    } catch (error) {
        console.log(error);
    }
}

type TPost = {
    creator_id: string,
    type: string,
    premium?: boolean;
    url: string,
    thumbnail?: string,
    blurhash?: string,
    orientation?: string,
    category: string,
    description: string,
    hashtags?: Array<string> | null,
    commenting?: boolean
}

export const addContent = async(row: TPost) => {
    try {
        const { data, error } = await db
        .from('content')
        .insert([row])
        .select()

        if (error) {
            console.log(error);
            return false;
        }

        return data;
    } catch (error) {
        console.log(error);
    }
}

export const searchHashtags = async(query: string) => {
    const { data, error } = await db
        .from("hashtags")
        .select("*")
        .ilike('title', `%${query}%`)

    if (error) {
        console.log(error);
        return false;
    }

    return data;
}

export const createHashtag = async(title: string, creator: string) => {
    try {
        const { data, error } = await db
        .from('hashtags')
        .insert([{ title, creator_id: creator }])
        .select("id, title, usage")
        .range(0, 9)

        if (error) {
            console.log(error);
            return false;
        }

        return data;
    } catch (error) {
        console.log(error);
    }
}

export const updateLocation = async(value: boolean, creator: string) => {
    try {
        const { data, error } = await db
        .from('creators')
        .update({ location: `${value}` })
        .eq('id', `${creator}`)
        .select()

        if (error) {
            console.log(error);
            return false;
        }

        return !!data;
    } catch (error) {
        console.log(error);
    }
}

export const updatePrivacy = async(value: boolean, creator: string) => {
    try {
        const { data, error } = await db
        .from('creators')
        .update({ private: `${value}` })
        .eq('id', `${creator}`)
        .select()

        if (error) {
            console.log(error);
            return false;
        }

        return !!data;
    } catch (error) {
        console.log(error);
    }
}

export const updateVisibility = async(value: boolean, creator: string) => {
    try {
        const { data, error } = await db
        .from('creators')
        .update({ ghost: `${value}` })
        .eq('id', `${creator}`)
        .select()

        if (error) {
            console.log(error);
            return false;
        }

        return !!data;
    } catch (error) {
        console.log(error);
    }
}

export const getAllUserPosts = async(creator: string, start: number, end: number) => {
    const { data, error } = await db
        .from("content")
        .select("id, creator_id, type, url, thumbnail, blurhash, orientation, category, description, network, value, streams, views, worth, hashtags, commenting, created_at, creators ( id, username, dp, private, ghost, verified, titles )")
        .range(start, end)
        .eq("creator_id", creator)
        .is("folder", null)

    if (error) {
        console.log(error);
        return false;
    }

    return data;
}

export const getAllUserFlips = async(creator: string, start: number, end: number) => {
    const { data, error } = await db
        .from("content")
        .select("id, creator_id, type, url, thumbnail, blurhash, orientation, category, description, network, value, streams, views, worth, hashtags, commenting, created_at, creators ( id, username, dp, private, ghost, verified, titles )")
        .range(start, end)
        .eq("creator_id", creator)
        .eq("type", "video")
        .is("folder", null)

    if (error) {
        console.log(error);
        return false;
    }

    return data;
}

export const getCelebrityPosts = async(creator: string, start: number, end: number) => {
    const { data, error } = await db
        .from("content")
        .select("id, creator_id, type, url, thumbnail, blurhash, orientation, category, description, network, value, streams, views, worth, hashtags, commenting, created_at, creators ( id, username, dp, private, ghost, verified, titles )")
        .range(start, end)
        // .eq("creator_id", creator)
        // .eq("type", "video")
        .is("folder", null)

    if (error) {
        console.log(error);
        return false;
    }

    return data;
}