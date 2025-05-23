import { query,mutation } from "./_generated/server";
import { v } from "convex/values";

export const getAllInterviews = query({
    handler : async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        if(!identity){
            throw new Error("User not authenticated");
        }

        const interviews = await ctx.db.query("interviews").collect();
        return interviews;
    }
})

export const getMyInterviews = query({
    handler : async(ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        if(!identity){
            return [];
        }
        const interviews = await ctx.db.query("interviews")
            .withIndex("by_candidate_id", (q) => q.eq("candidateId",identity.subject))
            .collect();
            return interviews;
        }

    }
)

export const getInterviewByStreamCallId = query({
    args : {
        streamCallId : v.string()
    },
    handler : async (ctx , args ) => {
        const interview = await ctx.db
            .query("interviews")
            .withIndex("by_stream_call_id", (q) => q.eq("streamCallId", args.streamCallId))
            .first();
        return interview;
    }
})

export const createInterview = mutation({
    args : {
        title : v.string(),
        descriptiion : v.optional(v.string()),
        startTime : v.number(),
        status : v.string(),
        streamCallId : v.string(),
        interviewerIds : v.array(v.string()),
        candidateId : v.string(),
    },
    handler : async (ctx ,args ) => {
        const identity = await ctx.auth.getUserIdentity();
        if(!identity){
            throw new Error("User not authenticated");
        
        }
        const interview = await ctx.db.insert("interviews",{
            ...args,
        });
        return interview;
    }
    }
)

export const updateInterviewStatus = mutation({
    args : {
        interviewId : v.id("interviews"),
        status : v.string(),
    },
    handler : async (ctx ,args ) => {
        const identity = await ctx.auth.getUserIdentity();
        if(!identity){
            throw new Error("User not authenticated");
        }
        return await ctx.db
            .patch(args.interviewId,{
                status : args.status,
                ...(args.status === "completed" ? { endTime : Date.now()} : {})
            })
        }
    }
)