using System;
using Microsoft.AspNetCore.Mvc;

namespace textRecognisionAWS.Controllers
{
	[ApiController]
	[Route("api/controller")]
	public class RekognitionController:ControllerBase
	{
		private Manager manager;
        public RekognitionController()
		{
			this.manager = new Manager();
		}
		[HttpGet]
		[Route("RekognitionText")]
		public string RekognitionText(string namefile)
		{
			return (this.manager.Example(namefile));
		}
		[HttpPost]
		[Route("UploadFile")]
		public Task<IResult> UploadFile(IFormFile file)
		{
			return(this.manager.Upload(file));
		}

    }
}

