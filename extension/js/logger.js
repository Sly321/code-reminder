function logger()
{

}

logger.prototype.log = function(string)
{
  console.log(string);
}

logger.prototype.info = function(string)
{
  this.log("INFO: " + string);
}

logger.prototype.error = function(string)
{
  this.log("ERROR: " + string);
}
