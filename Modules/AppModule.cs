using Nancy;
using SQLitePCL;

namespace StorylineBackend.modules
{
    public class AppModule: NancyModule
    {
        public AppModule()
        {
            Get("/", args => View["index"]);
            Get("/Vue", args => View["Vue"]);
            Get("/Plotly", args => View["Plotly"]);
            Get("/D3", args => View["D3"]);

            // Get["/Vue"] = _ => View["Vue"];
        }
    }
}