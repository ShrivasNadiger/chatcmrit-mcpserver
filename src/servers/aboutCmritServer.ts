import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { LeaderShipMember, Locations } from "../types/aboutCmritDataTypes.js";
import { getInfoCmrit } from "../utils/loadCmritData.js";

async function StartaboutCmritServer() {
  const server = new McpServer(
    {
      name: "about CMRIT college",
      version: "1.0.0",
    },
    { capabilities: { resources: {}, tools: {} } }
  );

  server.registerTool(
    "get_overview_of_cmrit",
    {
      title: "get_overview_of_cmrit_and_about",
      description: `Use this tool when a user asks for a general introduction, background, or summary about CMRIT 
    College in Bangalore. This includes its history, establishment, purpose, Vision, Mission and what the college is known for. 
    Works for queries like: "Tell me about CMRIT", "Overview of CMRIT", "What is CMRIT famous for?", 
    "Give me a summary of CMRIT","what is Mission and Vision of CMRIT?","When did CMRIT started ?","When is CMRIT found or established?". Does not include leadership names, address, or nearby places 
    — for that, use 'get_leardership_info', 'get_address', or 'get_importnant_geolocations' for extra information.`,
    },
    async () => {
      const overview = getInfoCmrit("overview");
      return {
        content: [
          {
            type: "text",
            text: overview,
          },
        ],
      };
    }
  );

  server.registerTool(
    "get_leardership_info",
    {
      title: "get_info_of_Leaders_or_organisation_Members_of_Cmrit",
      description: `Use this tool when a user asks about the principal, vice-principal, or other leadership members 
    of CMRIT, including their name, designation, and a short description of their role. Works for queries like:
    "Who is the principal of CMRIT?", "Leaders of CMRIT", "Heads of the college",
    "Who manages CMRIT?".Dont call this tool for Faculty or staff information. Returns a list with names, positions, and descriptions.`,
    },
    async () => {
      const members: LeaderShipMember[] | string = getInfoCmrit("LeaderShip");
      if (Array.isArray(members)) {
        return {
          content: [
            {
              type: "text",
              text: members
                .map(
                  (m) =>
                    `name :${m.name} - position:${m.position}- info:${m.about} `
                )
                .join("\n"),
            },
          ],
        };
      }
      return {
        content: [
          {
            type: "text",
            text: members,
          },
        ],
      };
    }
  );

  server.registerTool(
    "get_address",
    {
      title: "get_address_of_cmrit_bangolre_college_campus",
      description: `Use this tool when a user asks for the physical address, location, or directions to 
    CMRIT College in Bangalore. Works for queries like: "Where is CMRIT located?", "CMRIT campus address", 
    "What is the location of CMRIT?", "Give me the postal address of CMRIT","CMRIT comes in which District and Taluk?". Does not list nearby 
    attractions or metro stations — for that, use 'get_importnant_geolocations'.`,
    },
    async () => {
      const address: string = getInfoCmrit("address");
      return {
        content: [
          {
            type: "text",
            text: address,
          },
        ],
      };
    }
  );

  server.registerTool(
    "get_importnant_geolocations",
    {
      title: "get_info_about_nearby_geolocations",
      description: `Use this tool when a user asks about well-known places, metro stations,Institutions,useful places like Hospital,Market,Stations,Bus Stops,offices or landmarks near 
    CMRIT. Includes location names and distance from campus in kilometers. Works for queries like:
    "What are the nearest metro stations to CMRIT?", "Places near CMRIT", "How far is Brookfield Hospital 
    from CMRIT?", "Important locations around CMRIT", "Nearby landmarks".`,
    },
    async () => {
      const locations: Locations[] | string = getInfoCmrit(
        "important_geolocations"
      );
      if (Array.isArray(locations)) {
        return {
          content: [
            {
              type: "text",
              text: locations
                .map(
                  (m) =>
                    `Location_name:${m.location_name}-Distance from college:${m.Distance}`
                )
                .join("\n"),
            },
          ],
        };
      }
      return {
        content: [
          {
            type: "text",
            text: locations,
          },
        ],
      };
    }
  );

  const transport = new StdioServerTransport();
  server.connect(transport);
}
StartaboutCmritServer().catch(console.error);
