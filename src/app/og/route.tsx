import { ImageResponse } from "@vercel/og"

export const runtime = "edge"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const title = searchParams.get("title") || "Umay Geliyor! 05.09.2025"
  
  return new ImageResponse(
    <div style={{
      height:"100%", 
      width:"100%", 
      display:"flex",
      background:"linear-gradient(to bottom right, #fff7ed, #fde68a)",
      alignItems:"center", 
      justifyContent:"center",
      fontSize:72, 
      fontWeight:800
    }}>
      <div style={{ textAlign:"center", padding:"40px" }}>
        <div>👶</div>
        <div>{title}</div>
      </div>
    </div>,
    { width:1200, height:630 }
  )
}